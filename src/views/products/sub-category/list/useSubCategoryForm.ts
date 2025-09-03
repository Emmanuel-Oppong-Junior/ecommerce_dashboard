import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@apollo/client/react'
import toast from 'react-hot-toast'
import * as yup from 'yup'
import { CREATE_SUB_CATEGORY, UPDATE_SUB_CATEGORY } from '../../../../graphql/mutations'
import { GET_CATEGORIES, GET_SUB_CATEGORIES } from '../../../../graphql/queries'
import { uploadSingleImage } from '../../../../utils/utils'
import { CategoriesResponseType } from '../../../../types/apps/categoryTypes'

type CategoryFormValues = {
  name: string
  description?: string
  categoryId?: string
  image: (File | string)[]
}

interface SubCategory {
  id: string
  name: string
  categoryId?: string
  description?: string
  image: string
}

const SubCategorySchema = yup.object().shape({
  name: yup.string().max(255).required('Category name is required'),
  description: yup.string().max(255).optional(),
  categoryId: yup.string().max(255).required('CategoryId is required'),
  image: yup
    .array()
    .of(
      yup.mixed().test('is-file-or-url', 'Invalid image', value => {
        if (value instanceof File) {
          return value.type.startsWith('image/')
        }
        if (typeof value === 'string') {
          return /^https?:\/\/.*\.(jpeg|jpg|gif|png|svg)$/.test(value)
        }

        return false
      })
    )
    .min(1, 'You need to provide an image')
    .max(1)
    .required('You need to provide an image')
})

export const useSubCategoryForm = ({ subcategory, toggle }: { subcategory?: SubCategory; toggle: () => void }) => {
  const isEditMode = !!subcategory
  const [addSubCategory] = useMutation(CREATE_SUB_CATEGORY)
  const [updateSubCategory] = useMutation(UPDATE_SUB_CATEGORY)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { loading: loadingCategories, data: categories } = useQuery<CategoriesResponseType>(GET_CATEGORIES)
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<CategoryFormValues>({
    mode: 'onChange',
    resolver: yupResolver(SubCategorySchema),
    defaultValues: {
      name: '',
      description: '',
      image: []
    }
  })

  useEffect(() => {
    if (isEditMode && subcategory) {
      setValue('name', subcategory.name)
      setValue('categoryId', subcategory.categoryId)
      setValue('description', subcategory.description || '')
      setValue('image', [subcategory.image])
    } else {
      reset()
    }
  }, [subcategory, isEditMode, setValue, reset])

  const onSubmit = useCallback(
    async (values: CategoryFormValues) => {
      setIsSubmitting(true)
      try {
        let imageUrl = isEditMode ? subcategory?.image : ''

        if (values.image[0] instanceof File) {
          const uploadResult = await uploadSingleImage(values.image[0] as File)
          if (!uploadResult?.url) throw new Error('Image upload failed')
          imageUrl = uploadResult.url
        }

        const input = {
          name: values.name,
          categoryId: values.categoryId,
          description: values.description,
          image: imageUrl
        }

        if (isEditMode && subcategory) {
          await updateSubCategory({
            variables: { updateSubCategoryId: subcategory.id, input },
            refetchQueries: [GET_SUB_CATEGORIES]
          })
          toast.success('SubCategory updated successfully!')
        } else {
          await addSubCategory({
            variables: { input },
            refetchQueries: [GET_SUB_CATEGORIES]
          })
          toast.success('SubCategory added successfully!')
        }

        reset()
        toggle()
      } catch (error: any) {
        toast.error(error?.message || `Failed to ${isEditMode ? 'update' : 'add'} subcategory. Please try again.`)
      } finally {
        setIsSubmitting(false)
      }
    },
    [addSubCategory, updateSubCategory, reset, toggle, isEditMode, subcategory]
  )

  const handleClose = useCallback(() => {
    reset()
    toggle()
  }, [reset, toggle])

  return {
    isEditMode,
    control,
    errors,
    handleSubmit,
    onSubmit,
    handleClose,
    isSubmitting,
    loadingCategories,
    categories
  }
}

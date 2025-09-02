// src/views/products/category/list/useCategoryForm.ts

import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@apollo/client/react'
import toast from 'react-hot-toast'
import * as yup from 'yup'
import { CREATE_CATEGORY, UPDATE_CATEGORY } from '../../../../graphql/mutations'
import { GET_CATEGORIES } from '../../../../graphql/queries'
import { uploadSingleImage } from '../../../../utils/utils'

type CategoryFormValues = {
  name: string
  description?: string
  image: (File | string)[]
}

interface Category {
  id: string
  name: string
  description?: string
  image: string
}

const categorySchema = yup.object().shape({
  name: yup.string().max(255).required('Category name is required'),
  description: yup.string().max(255).optional(),
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

export const useCategoryForm = ({ category, toggle }: { category?: Category; toggle: () => void }) => {
  const isEditMode = !!category
  const [addCategory] = useMutation(CREATE_CATEGORY)
  const [updateCategory] = useMutation(UPDATE_CATEGORY)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<CategoryFormValues>({
    mode: 'onChange',
    resolver: yupResolver(categorySchema),
    defaultValues: {
      name: '',
      description: '',
      image: []
    }
  })

  useEffect(() => {
    if (isEditMode && category) {
      setValue('name', category.name)
      setValue('description', category.description || '')
      setValue('image', [category.image])
    } else {
      reset()
    }
  }, [category, isEditMode, setValue, reset])

  const onSubmit = useCallback(
    async (values: CategoryFormValues) => {
      setIsSubmitting(true)
      try {
        let imageUrl = isEditMode ? category?.image : ''

        if (values.image[0] instanceof File) {
          const uploadResult = await uploadSingleImage(values.image[0] as File)
          if (!uploadResult?.url) throw new Error('Image upload failed')
          imageUrl = uploadResult.url
        }

        const input = {
          name: values.name,
          description: values.description,
          image: imageUrl
        }

        if (isEditMode && category) {
          await updateCategory({
            variables: { updateCategoryId: category.id, input },
            refetchQueries: [GET_CATEGORIES]
          })
          toast.success('Category updated successfully!')
        } else {
          await addCategory({
            variables: { input },
            refetchQueries: [GET_CATEGORIES]
          })
          toast.success('Category added successfully!')
        }

        reset()
        toggle()
      } catch (error: any) {
        toast.error(error?.message || `Failed to ${isEditMode ? 'update' : 'add'} category. Please try again.`)
      } finally {
        setIsSubmitting(false)
      }
    },
    [addCategory, updateCategory, reset, toggle, isEditMode, category]
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
    isSubmitting
  }
}

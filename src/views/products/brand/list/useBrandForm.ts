import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@apollo/client/react'
import toast from 'react-hot-toast'
import * as yup from 'yup'
import { CREATE_BRAND, UPDATE_BRAND } from '../../../../graphql/mutations'
import { GET_BRANDS } from '../../../../graphql/queries'
import { uploadSingleImage } from '../../../../utils/utils'

type BrandFormValues = {
  name: string
  description?: string
  logo: (File | string)[]
}

interface Brand {
  id: string
  name: string
  description?: string
  logo: string
}

const brandSchema = yup.object().shape({
  name: yup.string().max(255).required('Brand name is required'),
  description: yup.string().max(255).optional(),
  logo: yup
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

export const useBrandForm = ({ brand, toggle }: { brand?: Brand; toggle: () => void }) => {
  const isEditMode = !!brand
  const [addBrand] = useMutation(CREATE_BRAND)
  const [updateBrand] = useMutation(UPDATE_BRAND)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<BrandFormValues>({
    mode: 'onChange',
    resolver: yupResolver(brandSchema),
    defaultValues: {
      name: '',
      description: '',
      logo: []
    }
  })

  useEffect(() => {
    if (isEditMode && brand) {
      setValue('name', brand.name)
      setValue('description', brand.description || '')
      setValue('logo', [brand.logo])
    } else {
      reset()
    }
  }, [brand, isEditMode, setValue, reset])

  const onSubmit = useCallback(
    async (values: BrandFormValues) => {
      setIsSubmitting(true)
      try {
        let imageUrl = isEditMode ? brand?.logo : ''

        if (values.logo[0] instanceof File) {
          const uploadResult = await uploadSingleImage(values.logo[0] as File)
          if (!uploadResult?.url) throw new Error('Image upload failed')
          imageUrl = uploadResult.url
        }

        const input = {
          name: values.name,
          description: values.description,
          logo: imageUrl
        }

        if (isEditMode && brand) {
          await updateBrand({
            variables: { updateBrandId: brand.id, input },
            refetchQueries: [GET_BRANDS]
          })
          toast.success('Brand updated successfully!')
        } else {
          await addBrand({
            variables: { input },
            refetchQueries: [GET_BRANDS]
          })
          toast.success('Brand added successfully!')
        }

        reset()
        toggle()
      } catch (error: any) {
        toast.error(error?.message || `Failed to ${isEditMode ? 'update' : 'add'} brand. Please try again.`)
      } finally {
        setIsSubmitting(false)
      }
    },
    [addBrand, updateBrand, reset, toggle, isEditMode, brand]
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

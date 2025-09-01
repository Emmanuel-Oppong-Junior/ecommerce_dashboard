import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import CustomTextField from 'src/@core/components/mui/text-field'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import ImageUploader from '../../../forms/file-uploader/ImageUploader'
import SideDrawer from '../../../../component/SideDrawer'
import { useMutation } from '@apollo/client/react'
import { CREATE_CATEGORY, UPDATE_CATEGORY } from '../../../../graphql/mutations'
import { GET_CATEGORIES } from '../../../../graphql/queries'
import { useCallback, useEffect } from 'react'
import { uploadSingleImage } from '../../../../utils/utils'
import toast from 'react-hot-toast'

const categorySchema = yup.object().shape({
  name: yup.string().max(255).required('Category name is required'),
  description: yup.string().max(255).optional(),
  image: yup.array().of(yup.mixed()).min(1, 'You need to provide a file').max(1).required('You need to provide a file')
})

type CategoryFormValues = yup.InferType<typeof categorySchema>

interface Category {
  id: string
  name: string
  description?: string
  image: string
}

interface SidebarAddCategoryProps {
  open: boolean
  toggle: () => void
  category?: Category
}

const SidebarAddCategory = ({ open, toggle, category }: SidebarAddCategoryProps) => {
  const [addCategory] = useMutation(CREATE_CATEGORY)
  const [updateCategory] = useMutation(UPDATE_CATEGORY)
  const isEditMode = !!category

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
      setValue('image', [category.image]) // Assuming image is stored as URL string
    } else {
      reset()
    }
  }, [category, isEditMode, setValue, reset])

  const onSubmit = useCallback(
    async (values: CategoryFormValues) => {
      try {
        let imageUrl = isEditMode ? category?.image : ''

        // Only upload new image if a new file is selected
        if (values.image[0] instanceof File) {
          const uploadResult = await uploadSingleImage(values.image[0] as File)
          if (!uploadResult?.url) throw new Error('Image upload failed')
          imageUrl = uploadResult.url
        }

        if (isEditMode && category) {
          await updateCategory({
            variables: {
              updateCategoryId: category.id,
              input: {
                name: values.name,
                description: values.description,
                image: imageUrl
              }
            },
            refetchQueries: [GET_CATEGORIES]
          })
          toast.success('Category updated successfully!')
        } else {
          await addCategory({
            variables: {
              input: {
                name: values.name,
                description: values.description,
                image: imageUrl
              }
            },
            refetchQueries: [GET_CATEGORIES]
          })
          toast.success('Category added successfully!')
        }

        reset()
        toggle()
      } catch (error: any) {
        toast.error(error?.message || `Failed to ${isEditMode ? 'update' : 'add'} category. Please try again.`)
      }
    },
    [addCategory, updateCategory, reset, toggle, isEditMode, category]
  )

  const handleClose = useCallback(() => {
    reset()
    toggle()
  }, [reset, toggle])

  return (
    <SideDrawer open={open} title={isEditMode ? 'Edit Category' : 'Add Category'} handleClose={handleClose}>
      <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <CustomTextField
                fullWidth
                sx={{ mb: 4 }}
                label='Category Name'
                placeholder='Phones, Laptops...'
                error={Boolean(errors.name)}
                {...field}
                helperText={errors.name?.message}
              />
            )}
          />
          <Controller
            name='description'
            control={control}
            render={({ field }) => (
              <CustomTextField
                multiline
                rows={4}
                fullWidth
                sx={{ mb: 4 }}
                label='Category Description'
                placeholder='description...'
                error={Boolean(errors.description)}
                {...field}
                helperText={errors.description?.message}
              />
            )}
          />
          <Controller
            name='image'
            control={control}
            render={() => <ImageUploader name='image' maxFiles={1} control={control} />}
          />
          <Box mt='2rem' sx={{ display: 'flex', alignItems: 'center' }}>
            <Button type='submit' variant='contained' sx={{ mr: 3 }}>
              {isEditMode ? 'Update' : 'Submit'}
            </Button>
            <Button variant='tonal' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </SideDrawer>
  )
}

export default SidebarAddCategory

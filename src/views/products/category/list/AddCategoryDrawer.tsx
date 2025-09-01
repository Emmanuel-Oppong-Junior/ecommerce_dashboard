import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import CustomTextField from 'src/@core/components/mui/text-field'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import ImageUploader from '../../../forms/file-uploader/ImageUploader'
import SideDrawer from '../../../../component/SideDrawer'
import { useMutation } from '@apollo/client/react'
import { CREATE_CATEGORY } from '../../../../graphql/mutations'
import { GET_CATEGORIES } from '../../../../graphql/queries'
import { useCallback } from 'react'
import { uploadSingleImage } from '../../../../utils/utils'
import toast from 'react-hot-toast'

const categorySchema = yup.object().shape({
  name: yup.string().max(255).required('Category name is required'),
  description: yup.string().max(255).optional(),
  image: yup.array().of(yup.mixed()).min(1, 'You need to provide a file').max(1).required('You need to provide a file')
})

type CategoryFormValues = yup.InferType<typeof categorySchema>

interface SidebarAddCategoryProps {
  open: boolean
  toggle: () => void
}

const SidebarAddCategory = ({ open, toggle }: SidebarAddCategoryProps) => {
  const [addCategory] = useMutation(CREATE_CATEGORY)
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<CategoryFormValues>({
    mode: 'onChange',
    resolver: yupResolver(categorySchema)
  })

  const onSubmit = useCallback(
    async (values: CategoryFormValues) => {
      try {
        const uploadResult = await uploadSingleImage(values.image[0] as File)
        if (!uploadResult?.url) throw new Error('Image upload failed')
        await addCategory({
          variables: {
            input: {
              name: values.name,
              description: values.description,
              image: uploadResult.url
            }
          },
          refetchQueries: [GET_CATEGORIES]
        })
        toast.success('Category added successfully!')
        reset()
        toggle()
      } catch (error: any) {
        toast.error(error?.message || 'Failed to add category. Please try again.')
      }
    },
    [addCategory, reset, toggle]
  )

  const handleClose = useCallback(() => {
    reset()
    toggle()
  }, [reset, toggle])

  return (
    <SideDrawer open={open} title='Add Category' handleClose={handleClose}>
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
              Submit
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

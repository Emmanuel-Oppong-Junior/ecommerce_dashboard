import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import CustomTextField from 'src/@core/components/mui/text-field'
import { Controller } from 'react-hook-form'
import ImageUploader from '../../../forms/file-uploader/ImageUploader'
import SideDrawer from '../../../../component/SideDrawer'
import { useCategoryForm } from './useCategoryForm'

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
  const { isEditMode, control, errors, handleSubmit, onSubmit, handleClose, isSubmitting } = useCategoryForm({
    category,
    toggle
  })

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
            <Button type='submit' variant='contained' sx={{ mr: 3 }} disabled={isSubmitting}>
              {isSubmitting ? <CircularProgress size={24} color='inherit' /> : isEditMode ? 'Update' : 'Submit'}
            </Button>
            <Button variant='tonal' color='secondary' onClick={handleClose} disabled={isSubmitting}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </SideDrawer>
  )
}

export default SidebarAddCategory

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import CustomTextField from 'src/@core/components/mui/text-field'
import { Controller } from 'react-hook-form'
import ImageUploader from '../../../forms/file-uploader/ImageUploader'
import SideDrawer from '../../../../component/SideDrawer'
import { useSubCategoryForm } from './useSubCategoryForm'
import MenuItem from '@mui/material/MenuItem'

interface SubCategory {
  id: string
  name: string
  description?: string
  categoryId: string
  image: string
}

interface SidebarAddSubCategoryProps {
  open: boolean
  toggle: () => void
  subcategory?: SubCategory
}

const SidebarAddSubCategory = ({ open, toggle, subcategory }: SidebarAddSubCategoryProps) => {
  const { isEditMode, control, errors, handleSubmit, onSubmit, handleClose, isSubmitting, categories } =
    useSubCategoryForm({
      subcategory,
      toggle
    })
  return (
    <SideDrawer open={open} title={isEditMode ? 'Edit SubCategory' : 'Add SubCategory'} handleClose={handleClose}>
      <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='name'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                fullWidth
                sx={{ mb: 4 }}
                label='SubCategory Name'
                placeholder='Phones, Laptops...'
                error={Boolean(errors.name)}
                {...field}
                {...(errors.name && { helperText: errors.name.message })}
              />
            )}
          />
          <Controller
            name='categoryId'
            control={control}
            rules={{ required: true }}
            render={({ field: { value = '', onChange } }) => (
              <CustomTextField
                select
                fullWidth
                defaultValue='Published'
                label='Category'
                sx={{ mb: 4 }}
                placeholder='Select Category'
                SelectProps={{
                  value: value,
                  onChange: e => onChange(e)
                }}
                id='validation-categoryId'
                error={Boolean(errors.categoryId)}
                aria-describedby='validation-categoryId'
                {...(errors.categoryId && { helperText: errors.categoryId.message })}
              >
                {categories?.categories?.map(category => (
                  <MenuItem value={category.id}>{category.name}</MenuItem>
                ))}
              </CustomTextField>
            )}
          />
          <Controller
            name='description'
            control={control}
            rules={{ required: true }}
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
                {...(errors.description && { helperText: errors.description.message })}
              />
            )}
          />
          <Controller
            name='image'
            control={control}
            rules={{ required: true }}
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

export default SidebarAddSubCategory

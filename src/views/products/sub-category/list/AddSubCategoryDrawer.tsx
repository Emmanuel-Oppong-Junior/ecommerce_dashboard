import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import CustomTextField from 'src/@core/components/mui/text-field'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import ImageUploader from '../../../forms/file-uploader/ImageUploader'
import SideDrawer from '../../../../component/SideDrawer'
import MenuItem from '@mui/material/MenuItem'

interface SidebarAddSubCategoryType {
  open: boolean
  toggle: () => void
}

const schema = yup.object().shape({
  name: yup.string().max(255).required(),
  categoryId: yup.number().required().positive(),
  description: yup.string().max(255).optional(),
  image: yup.array().of(yup.mixed()).min(1, 'You need to provide a file').max(1).required('You need to provide a file')
})

type AddCategoryType = yup.InferType<typeof schema>

const AddSubCategoryDrawer = ({ open, toggle }: SidebarAddSubCategoryType) => {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<AddCategoryType>({
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
  const onSubmit = (data: AddCategoryType) => {
    console.log(data)
  }

  const handleClose = () => {
    toggle()
    reset()
  }

  return (
    <SideDrawer open={open} title='Add Sub Category' handleClose={handleClose}>
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
                label='Category Name'
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
                {...(errors.categoryId && { helperText: 'This field is required' })}
              >
                <MenuItem value='1'>Computers</MenuItem>
                <MenuItem value='2'>Accessories</MenuItem>
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

export default AddSubCategoryDrawer

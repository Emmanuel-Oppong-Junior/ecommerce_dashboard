// import Button from '@mui/material/Button'
// import Box from '@mui/material/Box'
// import CustomTextField from 'src/@core/components/mui/text-field'
// import * as yup from 'yup'
// import { yupResolver } from '@hookform/resolvers/yup'
// import { Controller, useForm } from 'react-hook-form'
// import ImageUploader from '../../../forms/file-uploader/ImageUploader'
// import SideDrawer from '../../../../component/SideDrawer'
//
// interface SidebarAddBrandType {
//   open: boolean
//   toggle: () => void
// }
//
// const schema = yup.object().shape({
//   name: yup.string().max(255).required(),
//   description: yup.string().max(255).optional(),
//   image: yup.array().of(yup.mixed()).min(1, 'You need to provide a file').max(1).required('You need to provide a file')
// })
//
// type AddBrandType = yup.InferType<typeof schema>
//
// const SidebarAddBrandDrawer = ({ open, toggle }: SidebarAddBrandType) => {
//   const {
//     reset,
//     control,
//     handleSubmit,
//     formState: { errors }
//   } = useForm<AddBrandType>({
//     mode: 'onChange',
//     resolver: yupResolver(schema)
//   })
//   const onSubmit = (data: AddBrandType) => {
//     console.log(data)
//   }
//
//   const handleClose = () => {
//     toggle()
//     reset()
//   }
//
//   return (
//     <SideDrawer open={open} title='Add Brand' handleClose={handleClose}>
//       <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <Controller
//             name='name'
//             control={control}
//             rules={{ required: true }}
//             render={({ field }) => (
//               <CustomTextField
//                 fullWidth
//                 sx={{ mb: 4 }}
//                 label='Brand Name'
//                 placeholder='Phones, Laptops...'
//                 error={Boolean(errors.name)}
//                 {...field}
//                 {...(errors.name && { helperText: errors.name.message })}
//               />
//             )}
//           />
//           <Controller
//             name='description'
//             control={control}
//             rules={{ required: true }}
//             render={({ field }) => (
//               <CustomTextField
//                 multiline
//                 rows={4}
//                 fullWidth
//                 sx={{ mb: 4 }}
//                 label='Brand Description'
//                 placeholder='description...'
//                 error={Boolean(errors.description)}
//                 {...field}
//                 {...(errors.description && { helperText: errors.description.message })}
//               />
//             )}
//           />
//           <Controller
//             name='image'
//             control={control}
//             rules={{ required: true }}
//             render={() => <ImageUploader name='image' maxFiles={1} control={control} />}
//           />
//
//           <Box mt='2rem' sx={{ display: 'flex', alignItems: 'center' }}>
//             <Button type='submit' variant='contained' sx={{ mr: 3 }}>
//               Submit
//             </Button>
//             <Button variant='tonal' color='secondary' onClick={handleClose}>
//               Cancel
//             </Button>
//           </Box>
//         </form>
//       </Box>
//     </SideDrawer>
//   )
// }
//
// export default SidebarAddBrandDrawer

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import CustomTextField from 'src/@core/components/mui/text-field'
import { Controller } from 'react-hook-form'
import ImageUploader from '../../../forms/file-uploader/ImageUploader'
import SideDrawer from '../../../../component/SideDrawer'
import { useBrandForm } from './useBrandForm'
import { BrandType } from '../../../../types/apps/brandTypes'

interface SidebarAddBrandProps {
  open: boolean
  toggle: () => void
  brand?: BrandType
}

const SidebarAddBrand = ({ open, toggle, brand }: SidebarAddBrandProps) => {
  const { isEditMode, control, errors, handleSubmit, onSubmit, handleClose, isSubmitting } = useBrandForm({
    brand,
    toggle
  })

  return (
    <SideDrawer open={open} title={isEditMode ? 'Edit Brand' : 'Add Brand'} handleClose={handleClose}>
      <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <CustomTextField
                fullWidth
                sx={{ mb: 4 }}
                label='Brand Name'
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
                label='Brand Description'
                placeholder='description...'
                error={Boolean(errors.description)}
                {...field}
                helperText={errors.description?.message}
              />
            )}
          />
          <Controller
            name='logo'
            control={control}
            render={() => <ImageUploader name='logo' maxFiles={1} control={control} />}
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

export default SidebarAddBrand

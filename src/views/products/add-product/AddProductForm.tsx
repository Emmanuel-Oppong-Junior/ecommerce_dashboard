import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import ProductInformation from './ProductInfoSection'
import PricingSection from './PricingSection'
import OrganizeSection from './OrganizeSection'
import ProductImageSection from './ProductImageSection'
import VariantsSection from './VariantSection'
import { ProductFormType } from './types'
import { Box } from '@mui/system'
import React from 'react'

export const schema = yup.object({
  //production information
  name: yup.string().required().max(255),
  sku: yup.string().optional().max(255),
  barcode: yup.string().optional().max(255),
  description: yup.string().optional().max(5000),

  //images
  images: yup
    .array()
    .of(
      yup
        .mixed<File>()
        .test('fileType', 'Only .png, .jpg, .jpeg, and .gif files are allowed', file =>
          file ? ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'].includes(file.type) : false
        )
        .test('fileSize', 'Each file must be 2MB or smaller', file => (file ? file.size <= 2000000 : false))
    )
    .min(1, 'At least one image is required')
    .max(5, 'You can only upload up to 5 files'),

  //variants
  variants: yup.array().of(
    yup.object().shape({
      option: yup.string().required('Option is required'),
      value: yup.string().required('Value is required')
    })
  ),

  //pricing
  basicPrice: yup.number().typeError('Base Price must be a number').required().min(1),
  discount: yup.number().max(100, 'Discount cannot be more than 100%'),

  // organize
  category: yup.string().required(),
  brand: yup.string().required(),
  status: yup.string().required(),
  tags: yup.array().min(1, 'At least one tag is required')
})
const initialValue = {
  name: '',
  sku: '',
  barcode: '',
  description: '',
  images: [],
  variants: [],
  basicPrice: 0,
  discount: 0,
  category: '',
  brand: '',
  status: '',
  tags: []
}
const AddProductForm = () => {
  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting, isValid }
  } = useForm<ProductFormType>({ resolver: yupResolver(schema), defaultValues: initialValue })

  const onSubmit = (data: ProductFormType) => {
    toast.success('Form Submitted')
    console.log(data)
  }
  const draft = () => {
    console.log(getValues())
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={5}>
        <Grid item xs={12} md={8} sx={{ mb: 5 }}>
          <ProductInformation control={control} errors={errors} />
          <ProductImageSection control={control} errors={errors} />
          <VariantsSection control={control} errors={errors} />
        </Grid>
        <Grid item xs={12} md={4} sx={{ mb: 5 }}>
          <PricingSection control={control} errors={errors} />
          <OrganizeSection control={control} errors={errors} />
        </Grid>
        <Grid item xs={12}>
          <Box display='flex' gap={2} justifyContent='center'>
            <Button variant='outlined' color='error' size='medium' onClick={() => reset(initialValue)}>
              Discard
            </Button>
            <Button variant='contained' color='secondary' size='medium' onClick={draft}>
              Save Draft
            </Button>
            <Button variant='contained' color='primary' size='medium' type='submit' disabled={isSubmitting || !isValid}>
              Submit Product
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  )
}

export default AddProductForm

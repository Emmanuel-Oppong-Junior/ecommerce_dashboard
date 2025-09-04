import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import ProductInformation from './ProductInfoSection'
import PricingSection from './PricingSection'
import OrganizeSection from './OrganizeSection'
import ProductImageSection from './ProductImageSection'
import VariantsSection from './VariantSection'
import { Box } from '@mui/system'
import React from 'react'
import { useAddProductForm } from './useAddProductForm'

const AddProductForm = () => {
  const { control, errors, onSubmit, handleSubmit, reset } = useAddProductForm({})

  // const onSubmit = (data: ProductFormType) => {
  //   toast.success('Form Submitted')
  //   console.log(data)
  // }
  const draft = () => {
    console.log(errors)
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
            <Button variant='outlined' color='error' size='medium' onClick={() => reset({})}>
              Discard
            </Button>
            <Button variant='contained' color='secondary' size='medium' onClick={draft}>
              Save Draft
            </Button>
            <Button variant='contained' color='primary' size='medium' type='submit'>
              Submit Product
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  )
}

export default AddProductForm

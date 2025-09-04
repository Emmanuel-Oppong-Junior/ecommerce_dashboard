import { Box } from '@mui/system'
import React from 'react'
import Typography from '@mui/material/Typography'
import AddProductForm from 'src/views/products/add-product/AddProductForm'

const index = () => {
  return (
    <>
      <Box
        display='flex'
        flexDirection={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'stretch', md: 'center' }}
        justifyContent='space-between'
        mb={3}
        gap={2}
      >
        <Typography variant='h4'>Add New Product</Typography>
      </Box>
      <AddProductForm />
    </>
  )
}

export default index

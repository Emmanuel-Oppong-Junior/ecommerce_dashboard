import { useCallback, useMemo } from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { SelectChangeEvent } from '@mui/material/Select'

import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomTextField from 'src/@core/components/mui/text-field'

import TableHeader from 'src/views/products/list/TableHeader'
import EcommerceStatistics from 'src/views/dashboard/ecommerce/EcommerceStatistics'
import { ProductNode } from '../../types/apps/productTypes'
import TableRowContent from '../../component/TableRowContent'
import { useProducts } from './useProducts'
import RowOptions from '../../component/TableRowOptions'
import Typography from '@mui/material/Typography'
import TableLoadingSkeleton from '../../component/TableLoadingSkeleton'

interface CellType {
  row: ProductNode
}

const Products = () => {
  const {
    loading,
    error,
    filteredRows,
    value,
    handleFilter,
    handleBrandFilter,
    handleCategoryFilter,
    categoryFilter,
    brandFilter,
    paginationModel,
    setPaginationModel,
    categories,
    brands
  } = useProducts()

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        flex: 0.25,
        minWidth: 120,
        field: 'image',
        headerName: 'Image',
        renderCell: ({ row }: CellType) => (
          <CustomAvatar src={row.node.images[0]} sx={{ mr: 2.5, width: 60, height: 60 }} />
        )
      },
      {
        flex: 0.25,
        minWidth: 280,
        field: 'sku',
        headerName: 'SKU',
        renderCell: ({ row }: CellType) => <TableRowContent text={row.node.sku} />,
        sortComparator: (v1, v2) => v1.localeCompare(v2)
      },
      {
        flex: 0.25,
        minWidth: 280,
        field: 'name',
        headerName: 'Name',
        renderCell: ({ row }: CellType) => <TableRowContent text={row.node.name} />,
        sortComparator: (v1, v2) => v1.localeCompare(v2)
      },
      {
        flex: 0.25,
        minWidth: 100,
        field: 'isActive',
        headerName: 'Active',
        renderCell: ({ row }: CellType) => <TableRowContent text={row.node.isActive ? 'Yes' : 'No'} />,
        sortComparator: (v1, v2) => v1.localeCompare(v2)
      },
      {
        flex: 0.25,
        minWidth: 100,
        field: 'price',
        headerName: 'Price',
        renderCell: ({ row }: CellType) => <TableRowContent text={row.node.price.toString()} />,
        sortComparator: (v1, v2) => v1.localeCompare(v2)
      },
      {
        flex: 0.15,
        field: 'category',
        minWidth: 170,
        headerName: 'Category',
        renderCell: ({ row }: CellType) => <TableRowContent text={row.node.category.name} />
      },
      {
        flex: 0.15,
        field: 'brand',
        minWidth: 170,
        headerName: 'Brand',
        renderCell: ({ row }: CellType) => <TableRowContent text={row.node.brand?.name} />
      },
      {
        flex: 0.1,
        minWidth: 100,
        sortable: false,
        field: 'actions',
        headerName: 'Actions',
        renderCell: ({ row }: CellType) => <RowOptions id={row.node.id} type='category' toggle={() => null} />
      }
    ],
    []
  )
  const handleStatusChange = useCallback((e: SelectChangeEvent<unknown>) => {}, [])

  if (error) {
    return <Typography color='error'>Error loading Products: {error.message}</Typography>
  }

  if (loading) {
    return <TableLoadingSkeleton title='Products' />
  }
  console.log(categories)

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        <EcommerceStatistics />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Search Filters' />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <CustomTextField
                  select
                  fullWidth
                  defaultValue='Select Categories'
                  SelectProps={{
                    value: categoryFilter,
                    displayEmpty: true,
                    onChange: e => handleCategoryFilter(e.target.value || null)
                  }}
                >
                  {categories.map(item => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Grid>
              <Grid item sm={4} xs={12}>
                <CustomTextField
                  select
                  fullWidth
                  defaultValue='Select Plan'
                  SelectProps={{
                    value: brandFilter,
                    displayEmpty: true,
                    onChange: e => handleBrandFilter(e.target.value || null)
                  }}
                >
                  {brands.map(item => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Grid>
              <Grid item sm={4} xs={12}>
                <CustomTextField
                  select
                  fullWidth
                  defaultValue='Select Status'
                  SelectProps={{
                    value: status,
                    displayEmpty: true,
                    onChange: e => handleStatusChange(e)
                  }}
                >
                  <MenuItem value=''>Select Status</MenuItem>
                  <MenuItem value='pending'>Pending</MenuItem>
                  <MenuItem value='active'>Active</MenuItem>
                  <MenuItem value='inactive'>Inactive</MenuItem>
                </CustomTextField>
              </Grid>
            </Grid>
          </CardContent>
          <Divider sx={{ m: '0 !important' }} />
          <TableHeader value={value} handleFilter={handleFilter} />
          <DataGrid
            getRowId={row => row.node.id}
            loading={loading}
            autoHeight
            rowHeight={70}
            rows={filteredRows}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            aria-label='Category list table'
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default Products

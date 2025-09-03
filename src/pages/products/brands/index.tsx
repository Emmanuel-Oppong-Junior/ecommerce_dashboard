import { useMemo } from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import CustomAvatar from 'src/@core/components/mui/avatar'
import TableHeader from 'src/component/TableHeader'
import RowOptions, { EntityType } from '../../../component/TableRowOptions'
import TableRowContent from '../../../component/TableRowContent'
import { useBrands } from './useBrands'
import TableLoadingSkeleton from '../../../component/TableLoadingSkeleton'
import { BrandType } from '../../../types/apps/brandTypes'
import SidebarAddBrandDrawer from '../../../views/products/brand/list/SidebarAddBrandDrawer'

interface CellType {
  row: BrandType
}

const BrandList = () => {
  const {
    loading,
    error,
    filteredRows,
    value,
    handleFilter,
    addBrandOpen,
    toggleAddBrandDrawer,
    selectedBrand,
    paginationModel,
    setPaginationModel
  } = useBrands()

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        flex: 0.25,
        minWidth: 280,
        field: 'image',
        headerName: 'Image',
        renderCell: ({ row }: CellType) => {
          return <CustomAvatar src={row.logo} sx={{ mr: 2.5, width: 60, height: 60 }} />
        }
      },
      {
        flex: 0.25,
        minWidth: 280,
        field: 'name',
        headerName: 'Brand Name',
        renderCell: ({ row }: CellType) => {
          return <TableRowContent text={row.name} />
        }
      },
      {
        flex: 0.15,
        field: 'description',
        minWidth: 170,
        headerName: 'Description',
        renderCell: ({ row }: CellType) => {
          return <TableRowContent text={row.description} />
        }
      },
      {
        flex: 0.1,
        minWidth: 100,
        sortable: false,
        field: 'actions',
        headerName: 'Actions',
        renderCell: ({ row }: CellType) => (
          <RowOptions id={row.id} type={EntityType.Brand} toggle={() => toggleAddBrandDrawer(row)} />
        )
      }
    ],
    [toggleAddBrandDrawer]
  )

  if (error) {
    return <Typography color='error'>Error loading Brands: {error.message}</Typography>
  }

  if (loading) {
    return <TableLoadingSkeleton title='Brands' />
  }

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        <Typography variant='h4'>Brands</Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Divider sx={{ m: '0 !important' }} />
          <TableHeader
            title='Add Brand'
            searchPlaceholder='Search Brand'
            value={value}
            handleFilter={handleFilter}
            toggle={() => toggleAddBrandDrawer()}
          />
          <DataGrid
            loading={loading}
            autoHeight
            rowHeight={70}
            rows={filteredRows}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            aria-label='Brand list table'
          />
        </Card>
      </Grid>
      <SidebarAddBrandDrawer open={addBrandOpen} toggle={toggleAddBrandDrawer} brand={selectedBrand} />
    </Grid>
  )
}

export default BrandList

import { useMemo } from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import CustomAvatar from 'src/@core/components/mui/avatar'
import TableHeader from 'src/component/TableHeader'
import { SubCategoryType } from '../../../types/apps/subCategoryTypes'
import AddSubCategoryDrawer from 'src/views/products/sub-category/list/AddSubCategoryDrawer'
import RowOptions from '../../../component/TableRowOptions'
import TableRowContent from '../../../component/TableRowContent'
import { useSubCategories } from './useSubCategories'
import TableLoadingSkeleton from '../../../component/TableLoadingSkeleton'

interface CellType {
  row: SubCategoryType
}

const SubCategoryList = () => {
  const {
    loading,
    error,
    filteredRows,
    value,
    handleFilter,
    addSubCategoryOpen,
    toggleAddSubCategoryDrawer,
    selectedSubCategory,
    paginationModel,
    setPaginationModel
  } = useSubCategories()

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        flex: 0.25,
        minWidth: 280,
        field: 'image',
        headerName: 'Image',
        renderCell: ({ row }: CellType) => {
          return <CustomAvatar src={row.image} sx={{ mr: 2.5, width: 60, height: 60 }} />
        }
      },
      {
        flex: 0.25,
        minWidth: 280,
        field: 'name',
        headerName: 'Name',
        renderCell: ({ row }: CellType) => {
          return <TableRowContent text={row.name} />
        }
      },
      {
        flex: 0.25,
        minWidth: 280,
        field: 'parent',
        headerName: 'Parent',
        renderCell: ({ row }: CellType) => {
          return <TableRowContent text={row?.category?.name} />
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
          <RowOptions id={row.id} type='subCategory' toggle={() => toggleAddSubCategoryDrawer(row)} />
        )
      }
    ],
    [toggleAddSubCategoryDrawer]
  )

  if (error) {
    return <Typography color='error'>Error loading subcategories: {error.message}</Typography>
  }

  if (loading) {
    return <TableLoadingSkeleton title='SubCategories' />
  }

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        <Typography variant='h4'>SubCategories</Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Divider sx={{ m: '0 !important' }} />
          <TableHeader
            title='Add SubCategory'
            searchPlaceholder='Search SubCategory'
            value={value}
            handleFilter={handleFilter}
            toggle={() => toggleAddSubCategoryDrawer()}
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
            aria-label='SubCategory list table'
          />
        </Card>
      </Grid>
      <AddSubCategoryDrawer open={addSubCategoryOpen} toggle={toggleAddSubCategoryDrawer}  subcategory={selectedSubCategory} />
    </Grid>
  )
}

export default SubCategoryList

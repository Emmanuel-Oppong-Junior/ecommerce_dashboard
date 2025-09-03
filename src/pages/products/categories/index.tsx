import { useMemo } from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import CustomAvatar from 'src/@core/components/mui/avatar'
import TableHeader from 'src/component/TableHeader'
import { CategoryType } from '../../../types/apps/categoryTypes'
import AddCategoryDrawer from 'src/views/products/category/list/AddCategoryDrawer'
import RowOptions from '../../../component/TableRowOptions'
import TableRowContent from '../../../component/TableRowContent'
import { useCategories } from './useCategories'
import TableLoadingSkeleton from '../../../component/TableLoadingSkeleton'

interface CellType {
  row: CategoryType
}

const CategoryList = () => {
  const {
    loading,
    error,
    filteredRows,
    value,
    handleFilter,
    addCategoryOpen,
    toggleAddCategoryDrawer,
    selectedCategory,
    paginationModel,
    setPaginationModel
  } = useCategories()

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        flex: 0.25,
        minWidth: 280,
        field: 'image',
        headerName: 'Image',
        renderCell: ({ row }: CellType) => <CustomAvatar src={row.image} sx={{ mr: 2.5, width: 60, height: 60 }} />
      },
      {
        flex: 0.25,
        minWidth: 280,
        field: 'name',
        headerName: 'Category Name',
        renderCell: ({ row }: CellType) => <TableRowContent text={row.name} />,
        sortComparator: (v1, v2) => v1.localeCompare(v2)
      },
      {
        flex: 0.15,
        field: 'description',
        minWidth: 170,
        headerName: 'Description',
        renderCell: ({ row }: CellType) => <TableRowContent text={row.description} />
      },
      {
        flex: 0.1,
        minWidth: 100,
        sortable: false,
        field: 'actions',
        headerName: 'Actions',
        renderCell: ({ row }: CellType) => (
          <RowOptions id={row.id} type='category' toggle={() => toggleAddCategoryDrawer(row)} />
        )
      }
    ],
    [toggleAddCategoryDrawer]
  )

  if (error) {
    return <Typography color='error'>Error loading categories: {error.message}</Typography>
  }

  if (loading) {
    return <TableLoadingSkeleton title='Categories' />
  }

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        <Typography variant='h4'>Categories</Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Divider sx={{ m: '0 !important' }} />
          <TableHeader
            title='Add Category'
            searchPlaceholder='Search Category'
            value={value}
            handleFilter={handleFilter}
            toggle={() => toggleAddCategoryDrawer()}
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
            aria-label='Category list table'
          />
        </Card>
      </Grid>
      <AddCategoryDrawer open={addCategoryOpen} toggle={toggleAddCategoryDrawer} category={selectedCategory} />
    </Grid>
  )
}

export default CategoryList

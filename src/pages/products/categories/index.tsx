import { useCallback, useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import CustomAvatar from 'src/@core/components/mui/avatar'

import TableHeader from 'src/component/TableHeader'
import { CategoriesResponseType, CategoryType } from '../../../types/apps/categoryTypes'
import AddCategoryDrawer from 'src/views/products/category/list/AddCategoryDrawer'
import RowOptions from '../../../component/TableRowOptions'
import TableRowContent from '../../../component/TableRowContent'
import { GET_CATEGORIES } from '../../../graphql/queries'
import { useQuery } from '@apollo/client/react'

interface CellType {
  row: CategoryType
}

const columns: GridColDef[] = [
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
    headerName: 'Category Name',
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
    renderCell: ({ row }: CellType) => <RowOptions id={row.id} type='category' />
  }
]

const CategoryList = () => {
  const [value, setValue] = useState<string>('')
  const [addCategoryOpen, setAddCategoryOpen] = useState<boolean>(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const { loading, error, data } = useQuery<CategoriesResponseType>(GET_CATEGORIES)

  if (data) {
    console.log(data)
  }

  useEffect(() => {}, [value])

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  const toggleAddCategoryDrawer = () => setAddCategoryOpen(!addCategoryOpen)

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
            toggle={toggleAddCategoryDrawer}
          />
          <DataGrid
            loading={loading}
            autoHeight
            rowHeight={62}
            rows={data ? data.categories : []}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
      </Grid>
      <AddCategoryDrawer open={addCategoryOpen} toggle={toggleAddCategoryDrawer} />
    </Grid>
  )
}

export default CategoryList

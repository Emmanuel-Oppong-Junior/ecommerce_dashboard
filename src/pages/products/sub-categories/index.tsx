import { useCallback, useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

import { useDispatch, useSelector } from 'react-redux'
import CustomAvatar from 'src/@core/components/mui/avatar'

import { fetchData } from 'src/store/apps/category'

import { AppDispatch, RootState } from 'src/store'

import TableHeader from 'src/component/TableHeader'
import RowOptions from '../../../component/TableRowOptions'
import { SubCategoryType } from '../../../types/apps/subCategoryTypes'
import TableRowContent from '../../../component/TableRowContent'
import AddSubCategoryDrawer from '../../../views/products/sub-category/list/AddSubCategoryDrawer'

interface CellType {
  row: SubCategoryType
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
    renderCell: ({ row }: CellType) => <RowOptions id={row.id} type='brand' />
  }
]

const SubCategory = () => {
  const [value, setValue] = useState<string>('')
  const [addCategoryOpen, setAddCategoryOpen] = useState<boolean>(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.subCategories)

  useEffect(() => {
    dispatch(
      fetchData({
        q: value
      })
    )
  }, [dispatch, value])

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  const toggleAddCategoryDrawer = () => setAddCategoryOpen(!addCategoryOpen)

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        <Typography variant='h4'>Sub Categories</Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Divider sx={{ m: '0 !important' }} />
          <TableHeader
            title='Add Subcategory'
            searchPlaceholder='Search Subcategory'
            value={value}
            handleFilter={handleFilter}
            toggle={toggleAddCategoryDrawer}
          />
          <DataGrid
            autoHeight
            rowHeight={62}
            rows={store.data}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
      </Grid>
      <AddSubCategoryDrawer open={addCategoryOpen} toggle={toggleAddCategoryDrawer} />
    </Grid>
  )
}

export default SubCategory

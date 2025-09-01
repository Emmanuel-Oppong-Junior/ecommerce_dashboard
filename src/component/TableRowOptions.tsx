import { MouseEvent, useState } from 'react'
import IconButton from '@mui/material/IconButton'
import Icon from '../@core/components/icon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Link from 'next/link'
import { useMutation } from '@apollo/client/react'
import { DELETE_CATEGORY } from '../graphql/mutations'
import { GET_CATEGORIES } from '../graphql/queries'
import toast from 'react-hot-toast'

type RowOptionsProps = {
  id: string
  type: 'brand' | 'category' | 'subCategory'
  toggle?: () => void
}

const RowOptions = ({ id, type, toggle }: RowOptionsProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const rowOptionsOpen = Boolean(anchorEl)

  const [deleteCategory] = useMutation(DELETE_CATEGORY)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = async () => {
    if (type === 'category') {
      await deleteCategory({
        variables: { removeCategoryId: id },
        refetchQueries: [GET_CATEGORIES]
      })
      toast.success('Successfully deleted category')
    }
    handleRowOptionsClose()
  }

  const handleEdit = () => {
    handleRowOptionsClose()
    toggle()
  }

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <Icon icon='tabler:dots-vertical' />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem
          component={Link}
          sx={{ '& svg': { mr: 2 } }}
          href='/apps/user/view/account'
          onClick={handleRowOptionsClose}
        >
          <Icon icon='tabler:eye' fontSize={20} />
          View
        </MenuItem>
        <MenuItem onClick={handleEdit} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:edit' fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:trash' fontSize={20} />
          Delete
        </MenuItem>
      </Menu>
      {/*{type === 'category' && (*/}
      {/*  <AddCategoryDrawer open={addCategoryOpen} toggle={toggleAddCategoryDrawer} categoryId={id} />*/}
      {/*)}*/}
      {/*{type === 'brand' && <AddCategoryDrawer open={addCategoryOpen} toggle={toggleAddCategoryDrawer} />}*/}
      {/*{type === 'subCategory' && <AddSubCategoryDrawer open={addCategoryOpen} toggle={toggleAddCategoryDrawer} />}*/}
    </>
  )
}
export default RowOptions

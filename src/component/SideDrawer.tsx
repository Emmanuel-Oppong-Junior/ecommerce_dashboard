import Drawer from '@mui/material/Drawer'
import SideDrawerHeader from './SideDrawerHeader'
import React from 'react'

type SideDrawerHeaderProps = {
  title: string
  open: boolean
  handleClose: () => void
  children?: React.ReactNode
}

const SideDrawer = ({ open, title, handleClose, children }: SideDrawerHeaderProps) => {
  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <SideDrawerHeader handleClose={handleClose} title={title} />
      {children}
    </Drawer>
  )
}
export default SideDrawer

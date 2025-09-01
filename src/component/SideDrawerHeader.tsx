import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Icon from '../@core/components/icon'
import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'

type SideDrawerHeaderProps = {
  title: string
  handleClose: () => void
}

const SideDrawerHeader = ({ title, handleClose }: SideDrawerHeaderProps) => {
  return (
    <Header>
      <Typography variant='h5'>{title}</Typography>
      <IconButton
        size='small'
        onClick={handleClose}
        sx={{
          p: '0.438rem',
          borderRadius: 1,
          color: 'text.primary',
          backgroundColor: 'action.selected',
          '&:hover': {
            backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.16)`
          }
        }}
      >
        <Icon icon='tabler:x' fontSize='1.125rem' />
      </IconButton>
    </Header>
  )
}
const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))
export default SideDrawerHeader

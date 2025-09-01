import Typography from '@mui/material/Typography'

const RowComponent = ({ text }: { text: string }) => {
  return (
    <Typography
      noWrap
      variant='h6'
      sx={{
        fontWeight: 500,
        color: 'text.secondary',
        textTransform: 'capitalize',
        '&:hover': { color: 'primary.main' }
      }}
    >
      {text}
    </Typography>
  )
}
export default RowComponent

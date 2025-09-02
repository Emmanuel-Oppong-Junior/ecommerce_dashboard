import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Skeleton from '@mui/material/Skeleton'

interface TableLoadingSkeletonProps {
  title: string
}

const TableLoadingSkeleton = ({ title }: TableLoadingSkeletonProps) => {
  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        <Typography variant='h4'>{title}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Divider sx={{ m: '0 !important' }} />
          <Skeleton variant='rectangular' height={60} />
          <Skeleton variant='rectangular' height={400} sx={{ mt: 2 }} />
        </Card>
      </Grid>
    </Grid>
  )
}
export default TableLoadingSkeleton

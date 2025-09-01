import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import ImageUploader from '../../forms/file-uploader/ImageUploader'
import { AddProductionSectionProps } from './types'

const ProductImageSection = (props: AddProductionSectionProps) => (
  <Card style={{ marginTop: '2rem' }}>
    <CardHeader title='Product Images' />
    <CardContent>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <ImageUploader name='image' control={props.control} />
        </Grid>
      </Grid>
    </CardContent>
  </Card>
)
export default ProductImageSection

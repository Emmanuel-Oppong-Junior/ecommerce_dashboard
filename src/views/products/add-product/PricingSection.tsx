import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { Controller } from 'react-hook-form'
import CustomTextField from '../../../@core/components/mui/text-field'
import { AddProductionSectionProps } from './types'
import Typography from '@mui/material/Typography'

const PricingSection = ({ control, errors }: AddProductionSectionProps) => {
  return (
    <Card>
      <CardHeader title='Pricing' />
      <CardContent>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Controller
              name='basicPrice'
              control={control}
              rules={{ required: true, min: 1 }}
              render={({ field: { value = 0, onChange } }) => (
                <CustomTextField
                  type='number'
                  fullWidth
                  value={value}
                  label='Base Price'
                  onChange={onChange}
                  placeholder='100.50'
                  error={Boolean(errors.basicPrice)}
                  aria-describedby='validation-basic-name'
                  {...(errors.name && { helperText: 'This field is required' })}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name='discount'
              control={control}
              rules={{ required: true }}
              render={({ field: { value = 0, onChange } }) => {
                return (
                  <>
                    <CustomTextField
                      type='number'
                      fullWidth
                      value={value}
                      label='Discount (%)'
                      onChange={onChange}
                      placeholder='20'
                      error={Boolean(errors.discount)}
                      aria-describedby='validation-discount'
                      {...(errors.discount && { helperText: 'This field is required' })}
                    />
                    {value > 0 && (
                      <Typography mt='20px' variant='body2' color='goldenrod'>
                        Price After Discount: {((100 - value) * (Number(control._formValues.basicPrice) || 0)) / 100}
                      </Typography>
                    )}
                  </>
                )
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
export default PricingSection

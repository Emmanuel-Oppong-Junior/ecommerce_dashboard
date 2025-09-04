import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { Controller } from 'react-hook-form'
import CustomTextField from '../../../@core/components/mui/text-field'
import { AddProductionSectionProps } from './types'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'

const PricingSection = ({ control, errors }: AddProductionSectionProps) => {
  return (
    <Card>
      <CardHeader title='Pricing & Quantity' />
      <CardContent>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Controller
              name='currency'
              control={control}
              rules={{ required: true }}
              render={({ field: { value = '', onChange } }) => (
                <CustomTextField
                  select
                  fullWidth
                  defaultValue='GHS'
                  label='Currency'
                  placeholder='Select Currency'
                  SelectProps={{
                    value: value,
                    onChange: e => onChange(e)
                  }}
                  id='validation-currencty'
                  error={Boolean(errors.currency)}
                  aria-describedby='validation-status'
                  {...(errors.currency && { helperText: errors.currency.message })}
                >
                  <MenuItem value='GHS'>GHS</MenuItem>
                  <MenuItem value='USD'>USD</MenuItem>
                  <MenuItem value='EUR'>EUR</MenuItem>
                  <MenuItem value='GBP'>GBP</MenuItem>
                  <MenuItem value='NGN'>NGN</MenuItem>
                </CustomTextField>
              )}
            />
          </Grid>
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
                  aria-describedby='validation-basic-price'
                  {...(errors.name && { helperText: errors.basicPrice?.message })}
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
                      {...(errors.discount && { helperText: errors.discount?.message })}
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
          <Grid item xs={12}>
            <Controller
              name='quantity'
              control={control}
              rules={{ required: true, min: 1 }}
              render={({ field: { value = 0, onChange } }) => (
                <CustomTextField
                  type='number'
                  fullWidth
                  value={value}
                  label='Quantity'
                  onChange={onChange}
                  placeholder='100'
                  error={Boolean(errors.quantity)}
                  aria-describedby='validation-basic-qantity'
                  {...(errors.quantity && { helperText: errors.quantity?.message })}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name='taxRate'
              control={control}
              rules={{ required: true, min: 1 }}
              render={({ field: { value = 0, onChange } }) => (
                <CustomTextField
                  type='number'
                  fullWidth
                  value={value}
                  label='Tax Rate (%)'
                  onChange={onChange}
                  placeholder='20'
                  error={Boolean(errors.quantity)}
                  aria-describedby='validation-basic-taxRate'
                  {...(errors.taxRate && { helperText: errors.taxRate?.message })}
                />
              )}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
export default PricingSection

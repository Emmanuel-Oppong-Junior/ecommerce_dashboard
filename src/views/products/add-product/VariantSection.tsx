import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Controller } from 'react-hook-form'
import Grid from '@mui/material/Grid'
import CustomTextField from '../../../@core/components/mui/text-field'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import FormHelperText from '@mui/material/FormHelperText'
import { AddProductionSectionProps } from './types'
import Typography from '@mui/material/Typography'

const VariantsSection = ({ control, errors }: AddProductionSectionProps) => (
  <Card style={{ marginTop: '2rem' }}>
    <CardHeader title='Variants' />
    <CardContent>
      <Controller
        name='variants'
        control={control}
        render={({ field: { value = [], onChange } }) => (
          <Grid container spacing={5}>
            {value?.map((variant, index) => (
              <Grid item xs={12} key={index}>
                <Grid container spacing={5} alignItems='center'>
                  <Grid item xs={12} sm={3}>
                    <CustomTextField
                      select
                      fullWidth
                      label={`Variant Option ${index + 1}`}
                      value={variant.option}
                      onChange={e => {
                        const newVariants = [...value]
                        newVariants[index] = { ...newVariants[index], option: e.target.value }
                        onChange(newVariants)
                      }}
                      error={Boolean(errors.variants && !variant.option)}
                      aria-describedby={`validation-variant-option-${index}`}
                      {...(errors.variants && !variant.option && { helperText: errors.variants.message })}
                    >
                      <MenuItem value='size'>Size</MenuItem>
                      <MenuItem value='color'>Color</MenuItem>
                    </CustomTextField>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <CustomTextField
                      fullWidth
                      label={`Variant Value ${index + 1}`}
                      value={variant.value}
                      onChange={e => {
                        const newVariants = [...value]
                        newVariants[index] = { ...newVariants[index], value: e.target.value }
                        onChange(newVariants)
                      }}
                      placeholder='e.g., XL, Red'
                      error={Boolean(errors.variants && !variant.value)}
                      aria-describedby={`validation-variant-value-${index}`}
                      {...(errors.variants && !variant.value && { helperText: errors.variants.message })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <CustomTextField
                      fullWidth
                      type='number'
                      label={`Quantity ${index + 1}`}
                      value={variant.quantity || ''}
                      onChange={e => {
                        const newVariants = [...value]
                        newVariants[index] = { ...newVariants[index], quantity: e.target.value }
                        onChange(newVariants)
                      }}
                      placeholder='e.g., 100'
                      error={Boolean(errors.variants && !variant.quantity)}
                      aria-describedby={`validation-variant-quantity-${index}`}
                      {...(errors.variants && !variant.quantity && { helperText: errors.variant?.quantity?.message })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <CustomTextField
                      fullWidth
                      type='number'
                      label={`Price ${index + 1}`}
                      value={variant.price || ''}
                      onChange={e => {
                        const newVariants = [...value]
                        newVariants[index] = { ...newVariants[index], price: e.target.value }
                        onChange(newVariants)
                      }}
                      placeholder='e.g., 29.99'
                      error={Boolean(errors.variants && !variant.price)}
                      aria-describedby={`validation-variant-price-${index}`}
                      {...(errors.variants && !variant.price && { helperText: errors.variants.message })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <CustomTextField
                      fullWidth
                      type='number'
                      label={`Discount ${index + 1}`}
                      value={variant.discount || ''}
                      onChange={e => {
                        const newVariants = [...value]
                        newVariants[index] = { ...newVariants[index], discount: e.target.value }
                        onChange(newVariants)
                      }}
                      placeholder='e.g., 10'
                      error={Boolean(errors.variants && !variant.discount)}
                      aria-describedby={`validation-variant-discount-${index}`}
                      {...(errors.variants && !variant.discount && { helperText: errors.variants.message })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    {variant.discount > 0 && (
                      <Typography mt='10px' variant='body2' color='goldenrod'>
                        Price After Discount: {((100 - variant.discount) * (Number(variant.price) || 0)) / 100}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Button
                      variant='outlined'
                      color='error'
                      onClick={() => {
                        const newVariants = value.filter((_, i) => i !== index)
                        onChange(newVariants)
                      }}
                    >
                      Remove
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                variant='outlined'
                onClick={() => onChange([...value, { option: '', value: '', quantity: '', price: '', discount: '' }])}
              >
                Add Item
              </Button>
            </Grid>
          </Grid>
        )}
      />
      {errors.variants && (
        <FormHelperText
          id='validation-variants'
          sx={{ color: 'error.main', fontSize: theme => theme.typography.body2.fontSize }}
        >
          {errors.variants.message}
        </FormHelperText>
      )}
    </CardContent>
  </Card>
)

export default VariantsSection

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Controller } from 'react-hook-form'
import Grid from '@mui/material/Grid'
import CustomTextField from '../../../@core/components/mui/text-field'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import toast from 'react-hot-toast'
import FormHelperText from '@mui/material/FormHelperText'
import { AddProductionSectionProps } from './types'

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
                  <Grid item xs={12} sm={5}>
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
                      {...(errors.variants && !variant.option && { helperText: 'This field is required' })}
                    >
                      <MenuItem value='size'>Size</MenuItem>
                      <MenuItem value='color'>Color</MenuItem>
                    </CustomTextField>
                  </Grid>
                  <Grid item xs={12} sm={5}>
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
                      {...(errors.variants && !variant.value && { helperText: 'This field is required' })}
                    />
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
              <Button variant='outlined' onClick={() => onChange([...value, { option: '', value: '' }])}>
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

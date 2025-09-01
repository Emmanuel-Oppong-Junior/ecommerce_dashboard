import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { Controller } from 'react-hook-form'
import CustomTextField from '../../../@core/components/mui/text-field'
import MenuItem from '@mui/material/MenuItem'
import CustomAutocomplete from '../../../@core/components/mui/autocomplete'
import { AddProductionSectionProps } from './types'

const OrganizeSection = ({ control, errors }: AddProductionSectionProps) => {
  return (
    <Card style={{ marginTop: '2rem' }}>
      <CardHeader title='Organize' />
      <CardContent>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Controller
              name='category'
              control={control}
              rules={{ required: true }}
              render={({ field: { value = '', onChange } }) => (
                <CustomTextField
                  select
                  fullWidth
                  label='Category'
                  defaultValue='Laptops'
                  placeholder='Select Category'
                  SelectProps={{
                    value: value,
                    onChange: e => onChange(e)
                  }}
                  id='validation-basic-category'
                  error={Boolean(errors.category)}
                  aria-describedby='validation-basic-category'
                  {...(errors.category && { helperText: 'This field is required' })}
                >
                  <MenuItem value='Laptops'>Laptops</MenuItem>
                  <MenuItem value='Phones'>Phones</MenuItem>
                  <MenuItem value='Tablets'>Tablets</MenuItem>
                  <MenuItem value='Accessories'>Accessories</MenuItem>
                  <MenuItem value='Monitors'>Monitors</MenuItem>
                  <MenuItem value='Printers'>Printers</MenuItem>
                  <MenuItem value='Wearables'>Wearables</MenuItem>
                </CustomTextField>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name='brand'
              control={control}
              rules={{ required: true }}
              render={({ field: { value = '', onChange } }) => (
                <CustomTextField
                  select
                  fullWidth
                  defaultValue='Samsung'
                  label='Brand'
                  placeholder='Select Brand'
                  SelectProps={{
                    value: value,
                    onChange: e => onChange(e)
                  }}
                  id='validation-brand'
                  error={Boolean(errors.brand)}
                  aria-describedby='validation-brand'
                  {...(errors.brand && { helperText: 'This field is required' })}
                >
                  <MenuItem value='Samsung'>Samsung</MenuItem>
                  <MenuItem value='Apple'>Apple</MenuItem>
                  <MenuItem value='Dell'>Dell</MenuItem>
                  <MenuItem value='HP'>HP</MenuItem>
                  <MenuItem value='Lenovo'>Lenovo</MenuItem>
                  <MenuItem value='Asus'>Asus</MenuItem>
                  <MenuItem value='Acer'>Acer</MenuItem>
                  <MenuItem value='Microsoft'>Microsoft</MenuItem>
                  <MenuItem value='Google'>Google</MenuItem>
                </CustomTextField>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name='status'
              control={control}
              rules={{ required: true }}
              render={({ field: { value = '', onChange } }) => (
                <CustomTextField
                  select
                  fullWidth
                  defaultValue='Published'
                  label='Status'
                  placeholder='Select Status'
                  SelectProps={{
                    value: value,
                    onChange: e => onChange(e)
                  }}
                  id='validation-status'
                  error={Boolean(errors.status)}
                  aria-describedby='validation-status'
                  {...(errors.status && { helperText: 'This field is required' })}
                >
                  <MenuItem value='Published'>Published</MenuItem>
                  <MenuItem value='Scheduled'>Scheduled</MenuItem>
                  <MenuItem value='Inactive'>Inactive</MenuItem>
                </CustomTextField>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name='tags'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <CustomAutocomplete
                  multiple
                  options={['New Arrival', 'Best Seller', 'Trending', 'Discounted', 'Popular']}
                  filterSelectedOptions
                  defaultValue={[]}
                  id='autocomplete-multiple-outlined'
                  getOptionLabel={(option: string) => option}
                  onChange={(event, value) => {
                    onChange(value)
                  }}
                  renderInput={params => (
                    <CustomTextField
                      {...params}
                      label='Tags'
                      placeholder='Tags'
                      error={Boolean(errors.tags)}
                      {...(errors.tags && { helperText: 'This field is required' })}
                    />
                  )}
                />
              )}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
export default OrganizeSection

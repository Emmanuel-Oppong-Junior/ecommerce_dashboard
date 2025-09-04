import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { Controller } from 'react-hook-form'
import CustomTextField from '../../../@core/components/mui/text-field'
import MenuItem from '@mui/material/MenuItem'
import CustomAutocomplete from '../../../@core/components/mui/autocomplete'
import { AddProductionSectionProps } from './types'
import { useAddProductForm } from './useAddProductForm'

const OrganizeSection = ({ control, errors }: AddProductionSectionProps) => {
  const { categories, brands, subCategories } = useAddProductForm({})

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
                  {...(errors.category && { helperText: errors.category.message })}
                >
                  {categories.map(category => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </CustomTextField>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name='subcategory'
              control={control}
              rules={{ required: true }}
              render={({ field: { value = '', onChange } }) => (
                <CustomTextField
                  select
                  fullWidth
                  label='Sub Category'
                  defaultValue='tablets'
                  placeholder='Select Sub Category'
                  SelectProps={{
                    value: value,
                    onChange: e => onChange(e)
                  }}
                  id='validation-basic-sub-category'
                  error={Boolean(errors.subcategory)}
                  aria-describedby='validation-basic-sub-category'
                  {...(errors.subcategory && { helperText: errors.subcategory.message })}
                >
                  {subCategories.map(category => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
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
                  {...(errors.brand && { helperText: errors.brand.message })}
                >
                  {brands.map(brand => (
                    <MenuItem key={brand.id} value={brand.id}>
                      {brand.name}
                    </MenuItem>
                  ))}
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
                  {...(errors.status && { helperText: errors.status.message })}
                >
                  <MenuItem value='true'>Active</MenuItem>
                  <MenuItem value='false'>Inactive</MenuItem>
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
                      {...(errors.tags && { helperText: errors.tags.message })}
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

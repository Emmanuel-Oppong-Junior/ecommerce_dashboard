import { useState } from 'react'
import { convertToRaw, EditorState } from 'draft-js'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { Controller } from 'react-hook-form'
import CustomTextField from '../../../@core/components/mui/text-field'
import TextEditor from '../../forms/text-editor/TextEditor'
import draftToHtml from 'draftjs-to-html'
import FormHelperText from '@mui/material/FormHelperText'
import { AddProductionSectionProps } from './types'

const ProductInformation = ({ control, errors }: AddProductionSectionProps) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  return (
    <Card>
      <CardHeader title='Product Information' />
      <CardContent>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Controller
              name='name'
              control={control}
              render={({ field: { value = '', onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  label='Product Name'
                  onChange={onChange}
                  placeholder='Samsung Galaxy S23 Ultra'
                  error={Boolean(errors.name)}
                  aria-describedby='validation-basic-name'
                  {...(errors.name && { helperText: errors.name.message })}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name='sku'
              control={control}
              render={({ field: { value = '', onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  label='SKU'
                  onChange={onChange}
                  placeholder='123452'
                  error={Boolean(errors.sku)}
                  aria-describedby='validation-basic-sku'
                  {...(errors.sku && { helperText: errors.sku.message })}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name='barcode'
              control={control}
              render={({ field: { value = '', onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  label='Barcode'
                  onChange={onChange}
                  placeholder='643302412345'
                  error={Boolean(errors.barcode)}
                  aria-describedby='validation-basic-barcode'
                  {...(errors.barcode && { helperText: errors.barcode?.message })}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name='description'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <>
                  <TextEditor
                    editorState={editorState}
                    onEditorStateChange={newState => {
                      setEditorState(newState)
                      const htmlValue = draftToHtml(convertToRaw(newState.getCurrentContent()))
                      onChange(htmlValue)
                    }}
                    wrapperClassName='demo-wrapper'
                    editorClassName='demo-editor border p-2 rounded'
                  />
                  {errors.description && (
                    <FormHelperText
                      sx={{
                        mx: 0,
                        color: 'error.main',
                        fontSize: theme => theme.typography.body2.fontSize
                      }}
                    >
                      {errors.description?.message}
                    </FormHelperText>
                  )}
                </>
              )}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ProductInformation

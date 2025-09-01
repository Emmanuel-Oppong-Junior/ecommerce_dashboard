import { Control, FieldErrors } from 'react-hook-form'
import * as yup from 'yup'
import { schema } from './AddProductForm'

export interface variant {
  option: string
  value: string
}

export type ProductFormType = yup.InferType<typeof schema>

export interface AddProductionSectionProps {
  control: Control<ProductFormType>
  errors: FieldErrors<ProductFormType>
}

import { BrandType } from './brandTypes'
import { CategoryType } from './categoryTypes'
import { SubCategoryType } from './subCategoryTypes'
import { VariantTypes } from './variantTypes'

export type ProductTypes = {
  id: string
  name: string
  categoryId: string
  isActive: boolean
  quantity: number
  sku: string
  subcategoryId: string
  price: string
  description: string
  images: string
  brand: BrandType
  category: CategoryType
  subcategory: SubCategoryType
  variants: VariantTypes[]
  tags: TagsTypes[]
}
export type GetProductsResponseType = {
  products: ProductContentType
}
type ProductContentType = {
  edges: ProductNode[]
  pageInfo: PageInfo
}
type PageInfo = {
  hasPreviousPage: boolean
}
export type ProductNode = {
  node: ProductTypes
}

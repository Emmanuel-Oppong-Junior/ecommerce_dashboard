import { CategoryType } from './categoryTypes'

export type SubCategoryType = {
  id: string
  name: string
  category: CategoryType
  description: string
  image: string
  categoryId: string
}
export type SubCategoriesResponseType = {
  subCategories: SubCategoryType[]
}

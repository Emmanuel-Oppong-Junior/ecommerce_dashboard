import { CategoryType } from './categoryTypes'

export type SubCategoryType = {
  id: number
  name: string
  category: CategoryType
  description: string
  image: string
}

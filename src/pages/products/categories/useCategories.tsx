import { useCallback, useMemo, useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { debounce } from 'lodash'
import { GET_CATEGORIES } from '../../../graphql/queries'
import { CategoriesResponseType, CategoryType } from '../../../types/apps/categoryTypes'

export const useCategories = () => {
  const [value, setValue] = useState<string>('')
  const [addCategoryOpen, setAddCategoryOpen] = useState<boolean>(false)
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | undefined>(undefined)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const { loading, error, data } = useQuery<CategoriesResponseType>(GET_CATEGORIES)

  const handleFilter = useCallback(
    debounce((val: string) => {
      setValue(val)
    }, 300),
    []
  )

  const toggleAddCategoryDrawer = useCallback((category?: CategoryType) => {
    setSelectedCategory(category)
    setAddCategoryOpen(prev => !prev)
  }, [])

  const filteredRows = useMemo(() => {
    if (!data?.categories) return []
    if (!value) return data.categories
    return data.categories.filter(category =>
      [category.name, category.description].some(field => field.toLowerCase().includes(value.toLowerCase()))
    )
  }, [data, value])

  return {
    loading,
    error,
    filteredRows,
    value,
    handleFilter,
    addCategoryOpen,
    toggleAddCategoryDrawer,
    selectedCategory,
    paginationModel,
    setPaginationModel
  }
}

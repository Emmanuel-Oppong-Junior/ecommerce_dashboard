import { useCallback, useMemo, useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { debounce } from 'lodash'
import { GET_SUB_CATEGORIES } from '../../../graphql/queries'
import { SubCategoriesResponseType, SubCategoryType } from '../../../types/apps/subCategoryTypes'

export const useSubCategories = () => {
  const [value, setValue] = useState<string>('')
  const [addSubCategoryOpen, setAddSubCategoryOpen] = useState<boolean>(false)
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategoryType | undefined>(undefined)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const { loading, error, data } = useQuery<SubCategoriesResponseType>(GET_SUB_CATEGORIES)

  const handleFilter = useCallback(
    debounce((val: string) => {
      setValue(val)
    }, 300),
    []
  )

  const toggleAddSubCategoryDrawer = useCallback((subCategory?: SubCategoryType) => {
    setSelectedSubCategory(subCategory)
    setAddSubCategoryOpen(prev => !prev)
  }, [])

  const filteredRows = useMemo(() => {
    if (!data?.subCategories) return []
    if (!value) return data.subCategories

    return data.subCategories.filter(subCategory =>
      [subCategory.name].some(field => field.toLowerCase().includes(value.toLowerCase()))
    )
  }, [data, value])

  return {
    loading,
    error,
    filteredRows,
    value,
    handleFilter,
    addSubCategoryOpen,
    toggleAddSubCategoryDrawer,
    selectedSubCategory,
    paginationModel,
    setPaginationModel
  }
}

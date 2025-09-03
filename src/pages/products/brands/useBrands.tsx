import { useCallback, useMemo, useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { debounce } from 'lodash'
import { GET_BRANDS } from '../../../graphql/queries'

import { BrandsResponseType, BrandType } from '../../../types/apps/brandTypes'

export const useBrands = () => {
  const [value, setValue] = useState<string>('')
  const [addBrandOpen, setAddBrandOpen] = useState<boolean>(false)
  const [selectedBrand, setSelectedBrand] = useState<BrandType | undefined>(undefined)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const { loading, error, data } = useQuery<BrandsResponseType>(GET_BRANDS)

  const handleFilter = useCallback(
    debounce((val: string) => {
      setValue(val)
    }, 300),
    []
  )

  const toggleAddBrandDrawer = useCallback((brand?: BrandType) => {
    setSelectedBrand(brand)
    setAddBrandOpen(prev => !prev)
  }, [])

  const filteredRows = useMemo(() => {
    if (!data?.brands) return []
    if (!value) return data.brands

    return data.brands.filter(brand =>
      [brand.name].some(field => field.toLowerCase().includes(value.toLowerCase()))
    )
  }, [data, value])

  return {
    loading,
    error,
    filteredRows,
    value,
    handleFilter,
    addBrandOpen,
    toggleAddBrandDrawer,
    selectedBrand,
    paginationModel,
    setPaginationModel
  }
}

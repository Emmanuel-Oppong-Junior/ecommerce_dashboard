import { useCallback, useEffect, useMemo, useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { debounce } from 'lodash'
import { GET_PRODUCTS } from '../../graphql/queries'
import { GetProductsResponseType } from '../../types/apps/productTypes'

export const useProducts = () => {
  const [value, setValue] = useState<string>('')
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)
  const [brandFilter, setBrandFilter] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<boolean | null>(null)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [categories, setCategories] = useState<string[]>([])
  const [brands, setBrands] = useState<string[]>([])
  const { loading, error, data } = useQuery<GetProductsResponseType>(GET_PRODUCTS)

  // Extract unique categories and brands
  useEffect(() => {
    if (data?.products.edges) {
      const productCategories = data.products.edges.map(product => product.node.category?.name)
      const uniqueCategories = Array.from(new Set(productCategories))
      setCategories(uniqueCategories)

      const productBrands = data.products.edges.map(product => product.node.brand?.name)
      const uniqueBrands = Array.from(new Set(productBrands))
      setBrands(uniqueBrands)
    }
  }, [data])

  const handleFilter = useCallback(
    debounce((val: string) => {
      setValue(val)
    }, 300),
    []
  )

  const handleCategoryFilter = useCallback((category: string | null) => {
    setCategoryFilter(category)
  }, [])

  const handleBrandFilter = useCallback((brand: string | null) => {
    setBrandFilter(brand)
  }, [])

  const handleStatusFilter = useCallback((status: boolean | null) => {
    setStatusFilter(status)
  }, [])

  // Filter products based on search, category, brand and status
  const filteredRows = useMemo(() => {
    if (!data?.products.edges) return []

    return data.products.edges.filter(product => {
      const matchesSearch = !value || product.node.name.toLowerCase().includes(value.toLowerCase())
      const matchesCategory = !categoryFilter || product.node.category?.name === categoryFilter
      const matchesBrand = !brandFilter || product.node.brand?.name === brandFilter

      if (statusFilter !== null) {
        const matchesStatus = product.node.isActive.toString() === statusFilter.toString()

        return matchesSearch && matchesCategory && matchesBrand && matchesStatus
      }

      return matchesSearch && matchesCategory && matchesBrand
    })
  }, [data, value, categoryFilter, brandFilter, statusFilter])

  return {
    loading,
    error,
    filteredRows,
    value,
    handleFilter,
    categoryFilter,
    handleCategoryFilter,
    brandFilter,
    statusFilter,
    handleStatusFilter,
    handleBrandFilter,
    paginationModel,
    setPaginationModel,
    categories,
    brands
  }
}

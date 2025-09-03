
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { debounce } from 'lodash'
import { GET_PRODUCTS } from '../../graphql/queries'
import { GetProductsResponseType } from '../../types/apps/productTypes'

export const useProducts = () => {
  const [value, setValue] = useState<string>('')
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)
  const [brandFilter, setBrandFilter] = useState<string | null>(null)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [categories, setCategories] = useState<string[]>([])
  const [brands, setBrands] = useState<string[]>([])
  const { loading, error, data } = useQuery<GetProductsResponseType>(GET_PRODUCTS)

  // Extract unique categories and brands
  useEffect(() => {
    if (data?.products.edges) {
      // Get unique categories
      const productCategories = data.products.edges.map(product => product.node.category?.name)
      const uniqueCategories = Array.from(new Set(productCategories))
      setCategories(uniqueCategories)

      // Get unique brands
      const productBrands = data.products.edges.map(product => product.node.brand?.name)
      const uniqueBrands = Array.from(new Set(productBrands))
      setBrands(uniqueBrands)
    }
  }, [data])

  // Search filter handler
  const handleFilter = useCallback(
    debounce((val: string) => {
      setValue(val)
    }, 300), // Increased debounce delay to 300ms for better UX
    []
  )

  // Category filter handler
  const handleCategoryFilter = useCallback((category: string | null) => {
    setCategoryFilter(category)
  }, [])

  // Brand filter handler
  const handleBrandFilter = useCallback((brand: string | null) => {
    setBrandFilter(brand)
  }, [])

  // Filter products based on search, category, and brand
  const filteredRows = useMemo(() => {
    if (!data?.products.edges) return []

    return data.products.edges.filter(product => {
      const matchesSearch = !value || product.node.name.toLowerCase().includes(value.toLowerCase())
      const matchesCategory = !categoryFilter || product.node.category?.name === categoryFilter
      const matchesBrand = !brandFilter || product.node.brand?.name === brandFilter

      return matchesSearch && matchesCategory && matchesBrand
    })
  }, [data, value, categoryFilter, brandFilter])

  return {
    loading,
    error,
    filteredRows,
    value,
    handleFilter,
    categoryFilter,
    handleCategoryFilter,
    brandFilter,
    handleBrandFilter,
    paginationModel,
    setPaginationModel,
    categories,
    brands
  }
}

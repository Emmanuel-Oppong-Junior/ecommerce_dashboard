import { useCallback, useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { DELETE_BRAND, DELETE_CATEGORY, DELETE_SUB_CATEGORY } from '../graphql/mutations'
import { GET_BRANDS, GET_CATEGORIES, GET_SUB_CATEGORIES } from '../graphql/queries'
import { EntityType } from '../component/TableRowOptions'

interface DeleteResponse {
  __typename: string
  id: string
}

// Lookup table for mutations and refetch queries
const mutationConfig = {
  [EntityType.Brand]: {
    mutation: DELETE_BRAND,
    refetchQuery: GET_BRANDS,
    variableKey: 'deleteBrandId'
  },
  [EntityType.Category]: {
    mutation: DELETE_CATEGORY,
    refetchQuery: GET_CATEGORIES,
    variableKey: 'removeCategoryId'
  },
  [EntityType.SubCategory]: {
    mutation: DELETE_SUB_CATEGORY,
    refetchQuery: GET_SUB_CATEGORIES,
    variableKey: 'removeSubCategoryId'
  }
}

export const useDeleteEntity = (type: EntityType) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteMutation] = useMutation<DeleteResponse>(mutationConfig[type].mutation)

  const deleteEntity = useCallback(
    async (id: string) => {
      setIsDeleting(true)
      try {
        await deleteMutation({
          variables: { [mutationConfig[type].variableKey]: id },
          refetchQueries: [mutationConfig[type].refetchQuery],
          optimisticResponse: {
            __typename: `Delete${type.charAt(0).toUpperCase() + type.slice(1)}`,
            id
          }
        })
      } finally {
        setIsDeleting(false)
      }
    },
    [deleteMutation, type]
  )

  return { deleteEntity, isDeleting }
}

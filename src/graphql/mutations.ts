import gql from 'graphql-tag'

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      id
      image
      name
      description
    }
  }
`
export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($updateCategoryId: String!, $input: UpdateCategoryInput!) {
    updateCategory(id: $updateCategoryId, input: $input) {
      id
    }
  }
`
export const DELETE_CATEGORY = gql`
  mutation RemoveCategory($removeCategoryId: String!) {
    removeCategory(id: $removeCategoryId) {
      id
    }
  }
`

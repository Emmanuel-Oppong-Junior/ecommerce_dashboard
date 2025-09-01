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
export const DELETE_CATEGORY = gql`
  mutation RemoveCategory($removeCategoryId: String!) {
    removeCategory(id: $removeCategoryId) {
      id
    }
  }
`

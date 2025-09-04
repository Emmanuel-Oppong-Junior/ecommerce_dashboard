import gql from 'graphql-tag'

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      id
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

//sub category
export const CREATE_SUB_CATEGORY = gql`
  mutation CreateSubCategory($input: CreateSubCategoryInput!) {
    createSubCategory(input: $input) {
      id
    }
  }
`
export const UPDATE_SUB_CATEGORY = gql`
  mutation UpdateSubCategory($updateSubCategoryId: String!, $input: UpdateSubCategoryInput!) {
    updateSubCategory(id: $updateSubCategoryId, input: $input) {
      id
    }
  }
`
export const DELETE_SUB_CATEGORY = gql`
  mutation RemoveSubCategory($removeSubCategoryId: String!) {
    removeSubCategory(id: $removeSubCategoryId) {
      id
    }
  }
`

//brands
export const CREATE_BRAND = gql`
  mutation CreateBrand($input: CreateBrandInput!) {
    createBrand(input: $input) {
      createdAt
      description
      id
      logo
      name
      updatedAt
    }
  }
`
export const UPDATE_BRAND = gql`
  mutation UpdateBrand($updateBrandId: String!, $input: UpdateBrandInput!) {
    updateBrand(id: $updateBrandId, input: $input) {
      id
    }
  }
`
export const DELETE_BRAND = gql`
  mutation DeleteBrand($deleteBrandId: String!) {
    deleteBrand(id: $deleteBrandId) {
      id
    }
  }
`

// products
export const CREATE_PRODUCT = gql`
  mutation CreateProduct($createProductInput: CreateProductInput!) {
    createProduct(createProductInput: $createProductInput) {
      id
    }
  }
`

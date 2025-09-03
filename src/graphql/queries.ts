import gql from 'graphql-tag'

// categories
export const GET_CATEGORIES = gql`
  query Categories {
    categories {
      id
      image
      name
      description
    }
  }
`
export const GET_CATEGORY = gql`
  query Category($categoryId: String!) {
    category(id: $categoryId) {
      id
      image
      description
      name
    }
  }
`

//brands
export const GET_BRANDS = gql`
  query Brands {
    brands {
      id
      logo
      description
      name
    }
  }
`
export const GET_BRAND = gql`
  query Brand($brandId: String!) {
    brand(id: $brandId) {
      id
      logo
      name
      description
    }
  }
`

//sub categories
export const GET_SUB_CATEGORIES = gql`
  query SubCategories {
    subCategories {
      id
      image
      description
      name
      categoryId
      category {
        name
        id
      }
    }
  }
`
//products
export const GET_PRODUCTS = gql`
  query Node($paginationArgs: PaginationArgs, $filterArgs: ProductFilterArgs) {
    products(paginationArgs: $paginationArgs, filterArgs: $filterArgs) {
      edges {
        node {
          name
          category {
            name
          }
          price
          images
          brand {
            id
            name
          }
          categoryId
          isActive
          quantity
          sku
          subcategory {
            image
            id
          }
          subcategoryId
          id
          tags {
            name
          }
          variants {
            id
            color
            size
          }
        }
      }
    }
  }
`

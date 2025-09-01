import gql from 'graphql-tag'

export const GET_CATEGORIES = gql`
  query Categories {
    categories {
      id
      image
      name
      description
    }
  }
`;
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

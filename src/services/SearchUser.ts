import { gql } from '@apollo/client'

export default gql`
    query users($query: String!) {
        search(query: $query, type: USER, first: 15) {
        userCount
        nodes {
            ... on User {
            id
            name
            bioHTML
            }
        }
        }
    }
`
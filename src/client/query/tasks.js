import gql from "graphql-tag";

export default gql`
query {
    tasks {
      id
      content
    }
}
`
import gql from 'graphql-tag';

export default  gql`
mutation DeleteTask ($id:ID)
{
    deleteTask(id:$id){
      id
    }
}
`
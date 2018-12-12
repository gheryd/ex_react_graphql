import gql from 'graphql-tag';

export default  gql`
mutation CreateTask ($content:String)
{
    addTask(content:$content){
      id
    }
}
`;
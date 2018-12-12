import gql from "graphql-tag";

export default gql`
mutation Login($nickname: String, $password: String ){
    login(nickname:$nickname, password:$password){
        id
        nickname
   }
 }`
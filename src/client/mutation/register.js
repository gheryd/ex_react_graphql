import gql from "graphql-tag";

export default gql`
 mutation Register($nickname:String, $password:String) {
    signup(nickname:$nickname, password:$password){
        id,
        nickname
    }
}
`
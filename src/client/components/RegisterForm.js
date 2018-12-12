import React, {Component} from "react";
import mutation from "../mutation/register"
import {graphql} from "react-apollo";
import query from "../query/getUser";
import AuthForm from "./AuthForm";

class RegisterForm extends Component{
    constructor(props){
        super(props);
        this.state = {errors:[]};
    }

    componentWillUpdate(nextProps){
        if(!this.props.data.user && nextProps.data.user){
            nextProps.history.push(`/`)
        }
    }

    onSubmit(nickname, password){
        this.props.mutate({
            variables: {nickname, password},
            refetchQueries: [{query}]
        }).catch((err)=>{
            const errors = err.graphQLErrors.map(e=>e.message);
            this.setState({errors});
        });
    }

    render(){
        return (
            <div className="row">
                <h3>Register User</h3>
                <AuthForm errors={this.state.errors} onSubmit={this.onSubmit.bind(this)} />
            </div>
        );
    }
}

export default  graphql(query)(
    graphql(mutation)(RegisterForm)
);
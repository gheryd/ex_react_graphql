import React, {Component} from 'react';
import {graphql} from "react-apollo";
import query from "../query/getUser"


function needLogin(props){
    return !props.data.user && !props.data.loading
}

export default (ComponentToRender) => {
    class CheckAuth extends Component{
        
        //componentWillUpdate
        componentWillMount(){
            console.log("[CheckAuth.componentWillMount] this.props.data:", this.props.data);
            if(needLogin(this.props)){
                console.log("[CheckAuth.componentWillMount]redirect to login");
                //this.props.history.push(`/login`);
            }
        }

        render(){
            console.log("[CheckAuth.render] this.props.data:", this.props.data);
            if(needLogin(this.props)){
                console.log("[CheckAuth.render] need login:", this.props.data);
                this.props.history.push(`/login`);
            }
            return <ComponentToRender {...this.props} />; 
        }
    }

    return graphql(query)(CheckAuth);
}
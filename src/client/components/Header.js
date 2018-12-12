import React, {Component} from "react";

import {graphql} from "react-apollo";
import {NavLink} from "react-router-dom";
import query from "../query/getUser";
import mutation from "../mutation/logout"

class Header extends Component{

    onLogoutClick(){
        this.props.mutate({
            refetchQueries: [{query}]
        });
        return false;
    }

    renderButtons(){
        const {loading, user} = this.props.data;
        console.log("[Header.renderButtons] this.props.data:", this.props.data);
        if(loading){
            return <div>loading...</div>
        }
        if(user){
            return (
                <ul className="nav navbar-nav">
                    <li>
                        <a href="#" onClick={this.onLogoutClick.bind(this)}>Logout {user.nickname}</a>
                    </li>
                </ul>
            )
        }else {
            return (
                <ul className="nav navbar-nav">
                    <li>
                        <NavLink to="/login">login</NavLink>
                    </li>
                    <li>
                        <NavLink to="/register">register</NavLink>
                    </li>
                </ul>
            )
        }

    }

    render(){
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <span className="navbar-brand">
                        <NavLink to="/">Task List</NavLink>
                    </span>
                    {this.renderButtons()}
                </div>
            </nav>
        );
    }
}


export default graphql(query)( graphql(mutation)(Header) ); 
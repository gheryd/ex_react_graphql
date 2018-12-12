import React from "react";
import {Route, Switch} from "react-router-dom";
import Tasks from "./Tasks";
import CreateTask from "./CreateTask";
import Page404 from "./Page404"
import Header from "./Header";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import checkAuth from "./checkAuth";

const App = () => {
    return (
    <div className="container">
        <Header />
        <Switch>
            <Route exact path="/" component={checkAuth(Tasks)} />
            <Route path="/tasks/new" component={checkAuth(CreateTask)} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route component={Page404} />
        </Switch>
    </div>)
}

export default App;
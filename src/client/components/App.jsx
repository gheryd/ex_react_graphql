import React from "react";
import {Route, Switch} from "react-router-dom";
import Tasks from "./Tasks";
import CreateTask from "./CreateTask";
import Page404 from "./Page404"


const App = () => {
    return (
    <div className="container">
        <h1>Task List</h1>
        <Switch>
            <Route exact path="/" component={Tasks} />
            <Route path="/tasks/new" component={CreateTask} />
            <Route component={Page404} />
        </Switch>
    </div>)
}

export default App;
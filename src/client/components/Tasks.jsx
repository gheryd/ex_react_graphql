import React, {Component} from "react";
import {graphql} from 'react-apollo';
import {NavLink} from "react-router-dom";
import TaskItem from "./TaskItem";
import mutation from "../mutation/deleteTask";
import query from "../query/tasks";

class Tasks extends Component{

    deleteTask = (id)=> {
        this.props.mutate({
            variables: {id}
        }).then( ()=> this.props.data.refetch() );
    }

    render(){
        const {data} = this.props;
        if(data.loading){
            return <div>loading...</div>
        }
        if (data.error) 
            return <div>Error! {data.error.message}</div>;
        const tasks = data.tasks || [];
        return (
            <div className="panel panel-default">
                <div className="panel-body">
                 <NavLink to="/tasks/new">add</NavLink>
                    <ul className="list-group">
                        {tasks.map((task, i) =>
                            <TaskItem key="i" task={task} onDelete={this.deleteTask}></TaskItem>
                        )}
                    </ul>
                </div>
            </div>
        );
    }
}

export default graphql(query, (props)=> {
    return {
        options: () => ({"fetchPolicy": "network-only"})
      }
})
( graphql(mutation)(Tasks) );
import React, {Component} from "react";
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {NavLink} from "react-router-dom";
import TaskItem from "./TaskItem";


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
        return (
            <div className="panel panel-default">
                <div className="panel-body">
                 <NavLink to="/tasks/new">add</NavLink>
                    <ul className="list-group">
                        {data.tasks.map((task, i) =>
                            <TaskItem key="i" task={task} onDelete={this.deleteTask}></TaskItem>
                        )}
                    </ul>
                </div>
            </div>
        );
    }
}


const query = gql`
query {
    tasks {
      id
      content
    }
}
`
const mutation = gql`
mutation DeleteTask ($id:ID)
{
    deleteTask(id:$id){
      id
    }
}
`

export default graphql(query, (props)=> {
    return {
        options: () => ({"fetchPolicy": "network-only"})
      }
})
( graphql(mutation)(Tasks) );
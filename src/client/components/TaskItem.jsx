import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import React from "react"

const TaskItem = ({task, onDelete}) => {
    return <li className="list-group-item">
        {task.content}
        <span 
            className="btn btn-default btn-xs pull-right"
            aria-hidden="true"
            onClick = {()=>onDelete(task.id)}
        >
            <span className="glyphicon glyphicon-remove"></span>
        </span>
    </li>
};


export default TaskItem;
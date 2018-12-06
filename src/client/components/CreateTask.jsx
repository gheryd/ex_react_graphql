import React, { Component } from "react";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {NavLink} from "react-router-dom";

class CreateTask extends Component {
    constructor(props) {
        super(props);

        this.state = { content: '' };
    }

    onSubmit(event) {
        event.preventDefault();

        this.props.mutate({
            variables: {
                content: this.state.content
            }
        }).then(() => {
            this.setState({ content: '' })
            this.props.history.push(`/`)
        });
    }


    render() {
        return (
            <div className="panel panel-default">

                <div className="panel-body">
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <div className="form-group">
                            <label>new Task:</label>
                            <input required
                                className="form-control"
                                onChange={event => this.setState({ content: event.target.value })}
                                value={this.state.content}
                            />
                        </div>
                        <button className="btn btn-default pull-right" type="submit" >add</button>
                    </form>
                    <NavLink to="/">list</NavLink>
                </div>
                
            </div>
        );
    }

}

const mutation = gql`
mutation CreateTask ($content:String)
{
    addTask(content:$content){
      id
    }
}
`

export default graphql(mutation)(CreateTask);
import React, {Component} from "react";

class AuthForm extends Component{
    constructor(props){
        super(props);
        this.state = {nickname:'', password:''}
    }

    onSubmit(event){
        event.preventDefault();
        this.props.onSubmit(this.state.nickname, this.state.password);
    }

    render(){
        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <div className="form-group">
                            <label>nickname</label>
                            <input 
                                required
                                value={this.state.nickname}
                                onChange={e => this.setState({ nickname: e.target.value })}
                                className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>password</label>
                            <input
                                required
                                value={this.state.password}
                                onChange={e => this.setState({ password: e.target.value })}
                                type="password" className="form-control" />
                        </div>
                        <div className="text text-danger">
                            {this.props.errors.map(error=>
                                <div keys={error}>{error}</div>
                            )}
                        </div>
                        <button className="btn btn-default pull-right" type="submit" >submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default AuthForm;
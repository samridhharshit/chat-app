import React from "react";
import {Button} from "reactstrap";
import {Redirect} from 'react-router';

export default class IndexPage extends React.Component {
    state = {
        username: "",
        path: ""
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const path = `/chatroom/${this.state.username}`;
        await this.setState({path});
    };

    handleChange = async (e) => {
        e.preventDefault();
        await this.setState({username: e.target.value});
        console.log(this.state.username);
    };

    render() {
        const {username, path} = this.state;

        if (path !== "") {
            return (
                <Redirect push to={path} />
            )
        }
        return (
            <>
            <div className="row login-container-row">
                <div className="col-md-6 col-sm-12 login-container">
                    <div className="object">
                        <form
                            action={path}
                            onSubmit={this.handleSubmit}
                        >
                            <input
                                type="text"
                                placeholder="your chat Username..."
                                name="username"
                                value={username}
                                onChange={this.handleChange}
                            />
                            <Button
                                outline
                                color="primary"
                            >
                                Submit
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
                </>
        );
    }
}
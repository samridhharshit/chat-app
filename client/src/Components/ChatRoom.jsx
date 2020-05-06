import React from "react";
// import axios from 'axios';
import Button from "reactstrap/lib/Button";

let socket = require("socket.io-client")("http://localhost:5000");
let n = "";
export default class ChatRoom extends React.Component {

    state = {
        messageToSend: "",
        messageReceived: {},
        socket: null
    };

    componentDidMount() {
        // console.log(this.props.match.params.username);

        socket.on('connect', async function() {
            await console.log(socket.id);
        });

        n = this.props.match.params.username;
        const obj = {
            name: n,
            id: socket.id
        };
        socket.emit('addId', obj);
    }

    componentWillUnmount() {
        socket.emit('manual-disconnect', socket.id)
    }

    sendMessage = (e) => {
        e.preventDefault();
        const {messageToSend} = this.state;
        let data = [
            this.props.match.params.username,
            messageToSend
        ];
        // console.log(data)
        socket.emit('messageIn', data);
        // console.log(this.state.messageToSend);

    };

    changeMessage = async (e) => {
        e.preventDefault();
        const {value} = e.target;
        if (value !== "") {
            await this.setState({messageToSend: value});
        }
    };

    render() {
        const {messageReceived} = this.state;
        socket.on('messageOut', async data => {
            // console.log(data);
            let obj = {};
            if (data.sender && data.msg) {
                obj = {
                    sender: data.sender,
                    msg: data.msg
                }
            } else {
                obj = {
                    sender: data.dataToShow.sender,
                    msg: data.dataToShow.msg
                };
            }
            // console.log(obj)
            await this.setState({
                messageReceived: obj
            });

        });
        // console.log(messageReceived);
        return (
            <div className="row chat-row">
                <div className="col-md-6 offset-md-3 col-sm-12">
                    <div className="row chat">
                        <div className="chat-container col-sm-12">
                            <p>{messageReceived.sender}: {messageReceived.msg}</p>
                        </div>
                    </div>
                    <form
                        className="col-sm-12"
                        onSubmit={this.sendMessage}
                    >
                        <input
                            onChange={this.changeMessage}
                            placeholder="start writing..."
                            type="text"
                        />
                        <Button
                            outline
                            color="info"
                            type="submit"
                        >
                            Send
                        </Button>
                    </form>

                </div>
            </div>
        );
    }
}

/*
* */
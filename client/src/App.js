import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';
import IndexPage from "./Components/IndexPage";
import ChatRoom from "./Components/ChatRoom";

function App() {
    return (
        <Router>
            <div className="App container">
                <div className="row">
                    <div className="col-sm-12 title">
                        <h2>Chat Room</h2>
                    </div>
                </div>
                <Switch>
                    <Route exact path="/" component={IndexPage} />
                    <Route exact path="/chatroom/:username" component={ChatRoom}/>
                </Switch>
            </div>
      </Router>
  );
}

export default App;

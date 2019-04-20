import React, { Component } from 'react';
import Button from "./components/ui/button/button";
import Input from "./components/ui/input/input";



class App extends Component {
    render() {
        return (
            <div>
                <h1>Welcome</h1>
                <br/>
                <h2>Authorization</h2>
                <br/>
                <Input
                    name="Username"
                    type="text"/>
                <br/>
                <Input
                    name="Password"
                    type="password"/>
                <br/>
                <Button
                    text="Log in" />
            </div>
        );
    }
}

export default App;

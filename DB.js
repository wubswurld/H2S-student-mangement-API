import React, {Component} from "react";
import ReactDOM from "react-dom";
import firebase from 'firebase';
import {DB_BTB} from './Config.js' 

class App extends Component {
    constructor() {
        super()

        this.app = firebase.initializeApp(DB_BTB);
        this.database = this.app.database().ref().child('speed')
        this.state = {
            speed: 5
        }
    }

    componentDidMount() {
        this.database.on('value', snap => {
            this.setState({
                speed: snap.val()
            });
        });
    }

    render() {
        return ( <div>
            <h1>
                the speed is {this.state.speed};
            </h1>
        </div>)
    }
}
export default App
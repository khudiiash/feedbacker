import React, { Component } from 'react';
import User from './User.jsx'
import dimaAva from './assets/dima.jpg'
import alexAva from './assets/alex.jpg'
import mashaAva from './assets/masha.jpg'
import oksanaAva from './assets/oksana.jpg'

class Header extends Component {
    constructor(){
        super()
        this.state = {
            user: ''
        }

    }
    componentDidMount(){
        this.setState({user:this.props.user})
    }

    render() {
        let name = this.state.user
        name = name.charAt(0).toUpperCase()+name.substring(1)
        let ava;
        switch (this.state.user) {
            case "dima":
                ava = dimaAva
                break
            case "alex":
                ava = alexAva
                break
            case "oksana":
                ava = oksanaAva
                break
            case "masha":
                ava = mashaAva
                break
        }
        return (
            <div className='Header'>
                 <div
            className="btn-group btn-group-toggle type evaluators"
            data-toggle="buttons"
          >
                    <User name={name} ava={ava} checked={true} />
                </div>
            </div>
        );
    }
}

export default Header;
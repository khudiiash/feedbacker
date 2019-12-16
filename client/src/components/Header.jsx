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
        this.setDima = this.setDima.bind(this)
        this.setAlex = this.setAlex.bind(this)
        this.setOksana = this.setOksana.bind(this)
        this.setMaria = this.setMaria.bind(this)
    }
    componentDidMount(){
        this.setState({user:this.props.user})
    }
    setDima(){
        this.props.setUser('dima')
    }
    setAlex(){
        this.props.setUser('alex')
    }
    setOksana(){
        this.props.setUser('oksana')
    }
    setMaria(){
        this.props.setUser('masha')
    }
    render() {
        return (
            <div className='Header'>
                 <div
            className="btn-group btn-group-toggle type evaluators"
            data-toggle="buttons"
          >
                    <User name="Dima" ava={dimaAva} onClick={this.setDima} checked={true} />
                    <User name="Alex" ava={alexAva} onClick={this.setAlex} checked={false} />
                    <User name="Oksana" ava={oksanaAva} onClick={this.setOksana} checked={false} />
                    <User name="Masha" ava={mashaAva} onClick={this.setMasha} checked={false} />
                    </div>
            </div>
        );
    }
}

export default Header;
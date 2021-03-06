import React, { Component } from "react";
import User from "./User.jsx";
import dimaAva from "./assets/dima.jpg";
import alexAva from "./assets/alex.jpg";
import mashaAva from "./assets/masha.jpg";
import oksanaAva from "./assets/oksana.jpg";
class Loader extends Component {
  render(){
    return(
      <div className="loader">
         <div className="circle"></div>
         <div className="circle"></div>
         <div className="circle"></div>
         <div className="circle"></div>
         <div className="circle"></div>
         <div className="circle"></div>
      </div>
    )
  }
}
class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: ""
    };
  }
  componentDidMount() {
    this.setState({ user: this.props.user });
  }

  render() {
    let name = this.state.user;
    name = name.charAt(0).toUpperCase() + name.substring(1);
    let ava;
    switch (this.state.user) {
      case "dima":
        ava = dimaAva;
        break;
      case "alex":
        ava = alexAva;
        break;
      case "oksana":
        ava = oksanaAva;
        break;
      case "masha":
        ava = mashaAva;
        break;
    }
    return (
      <div className="Header">
  <div className="loading"><h4 style={{height: '0', color: 'white'}}>{this.props.loadedIssues >= 5 ? '':<Loader />}</h4></div>
        <div
          className="btn-group btn-group-toggle type evaluators"
          data-toggle="buttons"
        >
        </div>
      </div>
    );
  }
}

export default Header;

import React, { Component } from "react";

class User extends Component {

  render() {
    let ava = `url(${this.props.ava})`,
        id = "option" + this.props.name;
    return (
      <label
        className="btn btn-secondary active radio evaluator"
        onClick={this.props.onClick}
      >
        <div className="evaluator-info">
          <div className="evaluator-ava" style={{ backgroundImage: ava }}></div>
          <div className="evaluator-name">{this.props.name}</div>
        </div>
        {this.props.checked ? (
          <input
            type="radio"
            name="options"
            id={id}
            autoComplete="off"
            onChange={this.props.onClick}
            checked
          ></input>
        ) : (
          <input type="radio" name="options" id={id} autoComplete="off"></input>
        )}{" "}
      </label>
    );
  }
}

export default User;

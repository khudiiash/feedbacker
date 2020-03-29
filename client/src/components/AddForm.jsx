import React, { Component } from "react";

class AddForm extends Component {
  render() {
      let display = this.props.display
    return (
      <form
        className="Hint__addIssue"
        name="addIssue"
        style={{display}}
        onSubmit={this.props.addIssue}
      >
        <input
          className="addIssue__issue"
          onChange={this.props.issueInput}
          value={this.props.issue}
          placeholder="Issue"
        ></input>
        <div>
          <textarea
            type="text"
            className="Hint__addIssue-comment"
            value={this.props.comment}
            onChange={this.props.commentInput}
            placeholder="Comment"
          ></textarea>
        </div>
          <textarea
            type="text"
            className="Hint__addIssue-link"
            value={this.props.link}
            onChange={this.props.linkInput}
            placeholder="Link"
          ></textarea>


        <input
          className="Hint__addIssue__submit"
          type="submit"
          value="Add"
        ></input>
      </form>
    );
  }
}

export default AddForm;

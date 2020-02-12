import React, { Component } from "react";

class EditForm extends Component {
    constructor(){
        super()
        this.state = {
            issue: '',
            area: '',
            comment: [],
            link: 0
        }
    }
    componentDidMount(){
        this.setState({
            issue: this.props.editObject.issue,
            area: this.props.editObject.area,
            comment: this.props.editObject.comment,
            link: this.props.editObject.link,
        })
    }
  render() {
      let display = this.props.display
    return (
      <form
        className="Hint__addIssue"
        name="addIssue"
        style={{display}}
        onSubmit={this.props.editIssue}
      >
        <input
          className="addIssue__issue"
          value={this.props.editObject.issue}
          onChange={this.props.issueInput}
          placeholder="issue"
        ></input>

        <textarea
          type="text"
          value={this.props.editObject.comment}
          onChange={this.props.commentInput}
          placeholder="Comment"
        ></textarea>

        <input
          type="text"
          className="link"
          value={this.props.editObject.link}
          onChange={this.props.linkInput}
          placeholder="Link"
        ></input>
        <input
          className="Hint__addIssue__submit"
          type="submit"
          value="Edit"
        ></input>
      </form>
    );
  }
}

export default EditForm;

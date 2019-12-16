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
          className="addIssue__keyword"
          onChange={this.props.keywordInput}
          value={this.props.keyword}
          placeholder="keyword"
        ></input>
        <div className="Hint__addIssue__recommendations">
          <textarea
            type="text"
            index={0}
            value={this.props.recommendations[0]}
            onChange={this.props.recommendationsInput}
            placeholder="Recommendation"
          ></textarea>
          <textarea
            type="text"
            index={1}
            value={this.props.recommendations[1]}
            onChange={this.props.recommendationsInput}
            placeholder="Recommendation"
          ></textarea>
          <textarea
            type="text"
            index={2}
            value={this.props.recommendations[2]}
            onChange={this.props.recommendationsInput}
            placeholder="Recommendation"
          ></textarea>
        </div>

        <input
          type="number"
          className="points"
          value={this.props.points}
          onChange={this.props.pointsInput}
          placeholder="Points"
        ></input>
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

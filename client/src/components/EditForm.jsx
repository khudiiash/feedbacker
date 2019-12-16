import React, { Component } from "react";

class EditForm extends Component {
    constructor(){
        super()
        this.state = {
            keyword: '',
            area: '',
            recommendations: [],
            points: 0
        }
    }
    componentDidMount(){
        this.setState({
            keyword: this.props.editObject.keyword,
            area: this.props.editObject.area,
            recommendations: this.props.editObject.recommendations,
            points: this.props.editObject.points,
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
          className="addIssue__keyword"
          value={this.props.editObject.keyword}
          onChange={this.props.keywordInput}
          placeholder="keyword"
        ></input>
        <div className="Hint__addIssue__recommendations">
          <textarea
            type="text"
            index={0}
            value={this.props.editObject.recommendations ?  this.props.editObject.recommendations[0] : ''}
            onChange={this.props.recommendationsInput}
            placeholder="Recommendation"
          ></textarea>
          <textarea
            type="text"
            index={1}
            value={this.props.editObject.recommendations ? this.props.editObject.recommendations[1] : ''}

            onChange={this.props.recommendationsInput}
            placeholder="Recommendation"
          ></textarea>
          <textarea
            type="text"
            index={2}
            value={this.props.editObject.recommendations ?  this.props.editObject.recommendations[2] : ''}

            onChange={this.props.recommendationsInput}
            placeholder="Recommendation"
          ></textarea>
        </div>

        <input
          type="number"
          className="points"
          value={this.props.editObject.points}
          onChange={this.props.pointsInput}
          placeholder="Points"
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

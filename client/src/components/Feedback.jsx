import React, { Component } from "react";



const Paragraph = (props) => {
    let area = props.area,
        issuesArray = props.issuesArray
    return (
        <div className='Feedback__section'>
        <h4 className='Feedback__heading'>{issuesArray.length ? area : ''}</h4>
        <p className='Feedback__paragraph'>{issuesArray
          ? issuesArray.join(' ')
          : ""}
        </p>
        
      </div>
    );
};
const List = (props) => {
    let area = props.area,
        issuesArray = props.issuesArray
    return (
        <div className='Feedback__section'>
        <h4 className='Feedback__heading'>{issuesArray.length ? area : ''}</h4>
        {issuesArray
          ? issuesArray.map((recommendation, index) => {
              return (
                <li className="Feedback__li" key={index}>
          {index+1}. {recommendation}
                </li>
              );
            })
          : ""}
      </div>
    );
};

class Feedback extends Component {
  constructor(){
    super()
    this.state = {
      level: ''
    }
  }
  render() {
    let content = this.props.content,
      structure = this.props.structure,
      grammar = this.props.grammar,
      format = this.props.format,
      style = this.props.style;

    return (
      <div className="Feedback">
        <h1 className="Feedback__heading main">Feedback</h1>
        <div className="Feedback__body">
            <Paragraph area='content' issuesArray={content}/>
            <List area='structure' issuesArray={structure}/>
            <List area='grammar' issuesArray={grammar}/>
            <List area='style' issuesArray={style}/>
            <List area='format' issuesArray={format}/>
        </div>
    <footer className="Feedback__level">{this.props.level ? "Level: "+this.props.level : ''}</footer>
      </div>
    );
  }
}

export default Feedback;

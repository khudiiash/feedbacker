import React, { Component } from "react";



const Paragraph = (props) => {
    let area = props.area,
        issuesArray = props.issuesArray
    return (
        <div className='Feedback__section'>
        <h4 className='Feedback__heading'>{issuesArray.length ? area : ''}</h4>
        <p className='Feedback__paragraph'>{issuesArray
          ? issuesArray.map((r,index) => {
            if (issuesArray.length > 1 && index < issuesArray.length-1) {
              return r.replace(/\.$|\. $/,'')
            } 
            else {
              return r
            }
          }).join('. ')
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
                <li className="Feedback__li" key={index} dangerouslySetInnerHTML={{__html: `${index+1}. ${recommendation}`}}>
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
  componentDidMount(){

  }
  render() {
    let content = this.props.content,
      structure = this.props.structure,
      grammar = this.props.grammar,
      format = this.props.format,
      style = this.props.style,
      user = this.props.user

    return (
      <div className="Feedback">
        <div className="Feedback__heading">
            <h1 className="Feedback__heading main"><b>Feedback</b></h1>
            <img src="https://img.icons8.com/ios/50/000000/delete-sign.png" className='Feedback__heading__clearFeedback' title="Clear the feedback" onClick={this.props.clearFeedback}></img>
        </div>
        
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

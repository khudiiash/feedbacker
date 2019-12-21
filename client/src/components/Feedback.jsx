import React, { Component } from "react";
import { model } from "mongoose";



const Paragraph = (props) => {
    let area = props.area,
        issuesArray = props.issuesArray
    if (issuesArray.length) {
      return (
        <div className='Feedback__section'>
        <h4 className='Feedback__heading'>{issuesArray ? area : ''}</h4>
        <p className='Feedback__paragraph' dangerouslySetInnerHTML={{__html: `${issuesArray
          ? issuesArray.map((r,index) => {
            if (issuesArray.length > 1 && index < issuesArray.length-1) {
              return r.replace(/\.$|\. $/,'')
            } 
            else {
              return r
            }
          }).join('. ')
          : ""}`}}>
        </p>
        
      </div>
    );
    } else {
      return(
        <div></div>
      )
    }

};
const List = (props) => {
    let area = props.area,
        issuesArray = props.issuesArray
    if (issuesArray.length) {

    
    return (
        <div className='Feedback__section'>
        <h4 className='Feedback__heading'>{issuesArray ? area : ''}</h4>
        {issuesArray.length
          ? issuesArray.map((recommendation, index) => {
              return (
                <li className="Feedback__li" key={index} dangerouslySetInnerHTML={{__html: `${issuesArray.length > 1 ? index+1+'. ': ''}${recommendation}`}}>
                </li>
              );
            })
          : ""}
      </div>
    );
  } else {
    return  <div></div>
  }
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
      user = this.props.user,
      mode = this.props.mode

    return (
      <div className="Feedback">
        <div className="Feedback__heading">
            <h1 className="Feedback__heading main"><b>Feedback</b></h1>
            <div className='Feedback__heading__clearFeedback' title="Clear the feedback" onClick={this.props.clearFeedback}></div>
        </div>
        
        <div className="Feedback__body">

            {mode['content'] === 'paragraph' ? <Paragraph area='content' issuesArray={content}/> : <List area='content' issuesArray={content}/>}
            {mode['structure'] === 'paragraph' ? <Paragraph area='structure' issuesArray={structure}/> : <List area='structure' issuesArray={structure}/>}
            {mode['grammar'] === 'paragraph' ? <Paragraph area='grammar' issuesArray={grammar}/> : <List area='grammar' issuesArray={grammar}/>}
            {mode['style'] === 'paragraph' ? <Paragraph area='style' issuesArray={style}/> : <List area='style' issuesArray={style}/>}
            {mode['format'] === 'paragraph' ? <Paragraph area='format' issuesArray={format}/> : <List area='format' issuesArray={format}/>}


        </div>
    <footer className="Feedback__level">{this.props.level ? "Level: "+this.props.level : ''}</footer>
      </div>
    );
  }
}

export default Feedback;

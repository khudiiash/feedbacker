import React, { Component } from "react";



class Row extends Component {
    constructor() {
      super()
      this.state = {
        examples: {}
      }

    }
    updateExample(e, id) {
      this.setState({examples: {...this.state.examples, [`${id}`] : e.target.value}})
      autosize(e.target)
    }
    render() {
    let area = this.props.area,
        issuesArray = this.props.issuesArray
    if (issuesArray.length) {
      return (
        <React.Fragment>
        <tr className='Feedback__section'>
          <td colSpan='4'>{issuesArray && area}</td>
        </tr>
        <tr className='Feedback__section-heading'>
          <td>Issue</td>
          <td>Comment</td>
          <td>Example</td>
          <td>Link</td>
        </tr>
        
        {issuesArray && issuesArray.map((r) => {
           let example = this.state.examples[r._id]
           return <tr  key={r._id} className='Feedback__section-mistake'>
                    <td width='20%' className='Feedback__section-mistake-issue' key={r.issue}>{r.issue}</td>
                    <td width='40%' className='Feedback__section-mistake-comment' key={r.comment}>{r.comment}</td>
                    <td width='25%' className='Feedback__section-mistake-example' key={r.issue+r.comment}>
                      <div className="Feedback__section-mistake-example-container">
                        <textarea
                        className="exampleTextarea"
                        onChange={(e)=>  this.updateExample(e,r._id)}
                        value={this.state.examples[r._id]}
                        ></textarea>
                        <p>{this.state.examples[r._id]}</p>
                       </div>
                    </td>
                    <td width='15%' className='Feedback__section-mistake-link' key={r.link}><a href={r.link}>Learn More</a></td>
                  </tr>
             
          })}
        </React.Fragment>
        
    );
    } else {
      return(
        <tr></tr>
      )
      }
    }

};

function autosize(el){
  setTimeout(function(){
    el.style.cssText = 'height:auto; padding:0';
    // for box-sizing other than "content-box" use:
    // el.style.cssText = '-moz-box-sizing:content-box';
    el.style.cssText = 'height:' + el.scrollHeight + 'px';
  },0);
}
class Feedback extends Component {
  constructor(){
    super()
    this.state = {
      level: ''
    }
  }
  componentDidMount(){
    this.props.setUser(this.props.user)
  }
  render() {

    let {content,punctuation,grammar,format,style,mode} = this.props
   
                 
    
    return (
      <div className="Feedback">
        <div className="Feedback__heading">
            <div className="Feedback__heading main">Feedback</div>
            <div className='Feedback__heading__clearFeedback' title="Clear the feedback" onClick={this.props.clearFeedback}></div>
        </div>
        
        <table className="Feedback__body">
          <tbody>
            {grammar.length > 0 && <Row key='grammar' area='grammar' issuesArray={grammar}/>}
            {punctuation.length >0 && <Row key='punctuation' area='punctuation' issuesArray={punctuation}/>}
            {style.length > 0 && <Row key='style' area='style' issuesArray={style}/>}
            {format.length > 0 && <Row key='format' area='format' issuesArray={format}/>}
          </tbody>


        </table>
    <div className="Feedback__level">{this.props.level ? "Level: "+this.props.level : ''}</div>
      </div>
    );
  }
}

export default Feedback;

import React, { Component } from "react";
import axios from 'axios'
import AddForm from "./AddForm.jsx";
import EditForm from "./EditForm.jsx";
let env = "d"
function compare( a, b ) {
  if ( a.issue.charAt(0) < b.issue.charAt(0) ){
    return -1;
  }
  if ( a.issue.charAt(0) > b.issue.charAt(0) ){
    return 1;
  }
  return 0;
}
class Hint extends Component {
  constructor() {
    super();
    this.applyIssue = this.applyIssue.bind(this);
    this.addIssue = this.addIssue.bind(this);
    this.showAddForm = this.showAddForm.bind(this);
    this.showEditForm = this.showEditForm.bind(this);

    this.issueInput = this.issueInput.bind(this)
    this.linkInput = this.linkInput.bind(this)
    this.commentInput = this.commentInput.bind(this)
    this.deleteIssues = this.deleteIssues.bind(this)
    this.deleteIssue = this.deleteIssue.bind(this)
    this.editIssues = this.editIssues.bind(this)
    this.chooseIssueToEdit = this.chooseIssueToEdit.bind(this)
    this.editIssue = this.editIssue.bind(this)
    this.changeMode = this.changeMode.bind(this)

    this.state = {
      user: '',
      issue: '',
      area: '',
      comment: '',
      link: '',
      styles: {
        addForm: {
            display: 'none',
        },
        editForm: {
            display: 'none',
        },
        issue: {
          background: 'rgb(88, 88, 88)'
        }
      },

      issues: [],
      issueMode: 'apply',
      editObject: {},
      level: '',
      basePoints: 100,
      mode: 'list'
      
    }
    this._isMounted = false;

  }
  componentDidMount(){
    this._isMounted = true
    this.setState({user:this.props.user,mode: this.props.mode[this.props.area]})
    axios.get(`${env === 'd' ? 'http://localhost:5000':''}/templates`)
      .then(res => {if (this._isMounted) {
        this.setState({issues:res.data.filter(i => i.area === this.state.area).sort(compare)})}}
        )
    this.setState({area:this.props.area})
    this.props.updateApp(this.props.user)
    
  }
  componentWillUnmount(){
    this._isMounted = false
  }
  componentDidUpdate(prevProps,prevState) {
    if (prevProps.user !== this.props.user) {
      this.componentDidMount()
    }
    if (prevProps.mode !== this.props.mode) {
      this.componentDidMount()
    }
  }
  issueInput(e){
    let editObject = this.state.editObject
    if (Object.keys(editObject).length) {
      editObject.issue = e.target.value
      this.setState({editObject})
    }
    this.setState({issue:e.target.value})
   
  }
  linkInput(e){
    let editObject = this.state.editObject
    if (Object.keys(editObject).length) {
      editObject.link = e.target.value
      this.setState({editObject})
    }
    this.setState({link:e.target.value})
  }
  
  commentInput(e){
    let editObject = this.state.editObject
    let comment = this.state.comment
    comment = e.target.value
    if (Object.keys(editObject).length) {
      editObject.comment = e.target.value
      this.setState({editObject})
    }
    this.setState({comment})

  }
  changeMode(e){
      
      let mode  =  e.target.innerText === 'list' ? 'paragraph' : 'list'
      this.setState({
        mode
      })
      this.props.sendMode(this.state.area,mode)
  }
  showAddForm(){

    this.setState({
      issue: '',
      comment: '',
      link: ''
    })
    if (this.state.styles.editForm.display === 'block') this.showEditForm()
    if (this.state.styles.addForm.display === 'none') {
      let styles = this.state.styles
      styles.addForm.display = 'block'
      this.setState({styles}) 
    }
   
    else {
      let styles = this.state.styles
      styles.addForm.display = 'none'
      this.setState({styles}) 
    }
    
  }
  showEditForm(issueObject){
    if (issueObject) this.setState({editObject:issueObject})

    if (this.state.styles.editForm.display === 'none') {
      let styles = this.state.styles
      styles.editForm.display = 'block'
      this.setState({styles}) 
    }
   
    else {
      let styles = this.state.styles
      styles.editForm.display = 'none'
      this.setState({styles})
    }
  }
  addIssue(e) {
    e.preventDefault()
    let template = {
      issue: this.state.issue.trim(),
      area: this.state.area,
      comment: this.state.comment,
      link: this.state.link
    }      
  axios.post(`${env === 'd' ? 'http://localhost:5000':''}/templates/add`,template)
    .then(res => this.componentDidMount())
  this.showAddForm()
  
  }
  editIssue(e) {
    e.preventDefault()
    let template = {
      issue: this.state.editObject.issue.trim(),
      area: this.state.editObject.area,
      comment: this.state.editObject.comment,
      link: this.state.editObject.link
    }      
    axios.post(`${env === 'd' ? 'http://localhost:5000':''}/templates/update/`+this.state.editObject._id,template)
    .then(res => this.componentDidMount())
  this.showEditForm()
  this.editIssues()
  
  }
  deleteIssues(){
   
    if (this.state.issueMode === 'apply') {
      let styles = this.state.styles
      styles.issue.background = 'rgb(201,43,32)'
      this.setState({styles,issueMode: 'delete'})
    } else {
      let styles = this.state.styles
      styles.issue.background = 'rgb(88,88,88)'
      this.setState({styles,issueMode:'apply'})
    }
     
  }
  editIssues(){
    if (this.state.styles.addForm.display === 'block') this.showAddForm()
    if (this.state.styles.editForm.display === 'block') {
      this.showEditForm()
    }

    if (this.state.issueMode !== 'edit') {
      let styles = this.state.styles
      styles.issue.background = 'rgb(255, 237, 132)'
      this.setState({styles,issueMode: 'edit'})
    } else {
      let styles = this.state.styles
      styles.issue.background = 'rgb(88,88,88)'
      this.setState({styles,issueMode:'apply'})
    }

     
  }
  deleteIssue(e) {
  
    let id = this.state.issues.find(i => i.issue === e.target.innerText)._id
    axios.delete(`${env === 'd' ? 'http://localhost:5000':''}/templates/${id}`)
    .then(res => this.componentDidMount())
    this.setState({
      issues: this.state.issues.filter(el => el._id !== id)
    })

  
  }
  chooseIssueToEdit(e) {
    let el = e.target.innerText,
    issueObject = this.state.issues.find(i => i.issue === el)
    this.showEditForm(issueObject)  
  } 
  applyIssue(e) {
    let issue = this.state.issues.find(i => i.issue === e.target.innerText);
    this.props.appendIssue(issue);
    this.componentDidMount()
  }

  render() {
    let className = `Hint ${this.props.area}`,
      issues = this.state.issues.map(i => i.issue),
      addDisplay = this.state.styles.addForm.display,
      editDisplay = this.state.styles.editForm.display,
      issueFunction = this.applyIssue
      switch (this.state.issueMode) {
        case 'apply':
          issueFunction = this.applyIssue
          break
        case 'delete':
          issueFunction = this.deleteIssue
          break
        case 'edit':
          issueFunction = this.chooseIssueToEdit
          break
        default:
          issueFunction = this.applyIssue
      }

    return (
      <div className={className}>
          <div className="Hint__header">
          <div className="Hint__header__delete-issue" onClick={this.deleteIssues}>
             delete
            </div>
          <div className="Hint__header__edit-issue" onClick={this.editIssues}>
                <div className='edit' id='edit'>edit</div>
          </div>
            <div className='Hint__header__title' data-speed={Math.floor(this.props.area.length/3)}><h2>{this.props.area}</h2></div>
          <div className="Hint__header__add-issue" onClick={this.showAddForm}>
              add
          </div>
          </div>
        
        <AddForm issue={this.state.issue} comment={this.state.comment} link={this.state.link} addIssue={this.addIssue} issueInput={this.issueInput} commentInput={this.commentInput} linkInput={this.linkInput} display={addDisplay}/>

        <EditForm editIssue={this.editIssue} editObject={this.state.editObject} issueInput={this.issueInput} commentInput={this.commentInput} linkInput={this.linkInput} display={editDisplay}/>
        <div className="issues-container">
          {issues 
            ? issues.map((issue, index) => {
                return (
                  <button
                    className="issue"
                    area={this.props.area}
                    style={{background:this.state.styles.issue.background}}
                    onClick={issueFunction}
                    id={issue._id}
                    key={index}
                  >
                    {issue}
                  </button>
                );
              })
            : ""}
        </div>
       
      </div>
    );
  }
}

export default Hint;

import React, { Component } from "react";
import axios from 'axios'
import AddForm from "./AddForm.jsx";
import EditForm from "./EditForm.jsx";
let env = "p"

class Hint extends Component {
  constructor() {
    super();
    this.applyIssue = this.applyIssue.bind(this);
    this.addIssue = this.addIssue.bind(this);
    this.showAddForm = this.showAddForm.bind(this);
    this.showEditForm = this.showEditForm.bind(this);

    this.keywordInput = this.keywordInput.bind(this)
    this.areaInput = this.keywordInput.bind(this)
    this.pointsInput = this.pointsInput.bind(this)
    this.recommendationsInput = this.recommendationsInput.bind(this)
    this.deleteIssues = this.deleteIssues.bind(this)
    this.deleteIssue = this.deleteIssue.bind(this)
    this.editIssues = this.editIssues.bind(this)
    this.chooseIssueToEdit = this.chooseIssueToEdit.bind(this)
    this.editIssue = this.editIssue.bind(this)

    this.state = {
      user: '',
      keyword: '',
      area: '',
      recommendations: ['','',''],
      points: '',
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
      basePoints: 100
      
    }
    this._isMounted = false;

  }
  componentDidMount(){
    this._isMounted = true
    this.setState({user:this.props.user})
    axios.get(`${env === 'd' ? 'http://localhost:5000':''}/templates`)
      .then(res => {if (this._isMounted) this.setState({issues:res.data.filter(i => i.area === this.state.area && i.user === this.props.user)})})
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
  }
  keywordInput(e){
    let editObject = this.state.editObject
    if (Object.keys(editObject).length) {
      editObject.keyword = e.target.value
      this.setState({editObject})
    }
    this.setState({keyword:e.target.value})
   
  }
  pointsInput(e){
    let editObject = this.state.editObject
    if (Object.keys(editObject).length) {
      editObject.points = e.target.value
      this.setState({editObject})
    }
    this.setState({points:e.target.value})
  }
  
  recommendationsInput(e){
    let editObject = this.state.editObject
    let recommendations = this.state.recommendations
    let index = e.target.getAttribute('index')
    recommendations[index] = e.target.value
    if (Object.keys(editObject).length) {
      editObject.recommendations[index] = e.target.value
      this.setState({editObject})
    }
    this.setState({recommendations})

  }
  showAddForm(){

    this.setState({
      keyword: '',
      recommendations: ['','',''],
      points: ''
    })
    if (this.state.styles.editForm.display === 'block') this.showEditForm()
    if (this.state.styles.addForm.display === 'none') {
      let styles = this.state.styles
      styles.addForm.display = 'block'
      this.setState({styles}) // show addIssues and rotate + to become x
    }
   
    else {
      let styles = this.state.styles
      styles.addForm.display = 'none'
      this.setState({styles}) // show addIssues and rotate + to become x
    }
    
  }
  showEditForm(issueObject){
    if (issueObject) this.setState({editObject:issueObject})

    if (this.state.styles.editForm.display === 'none') {
      let styles = this.state.styles
      styles.editForm.display = 'block'
      this.setState({styles}) // show addIssues and rotate + to become x
    }
   
    else {
      let styles = this.state.styles
      styles.editForm.display = 'none'
      this.setState({styles}) // show addIssues and rotate + to become x
    }
  }
  addIssue(e) {
    e.preventDefault()
    let template = {
      user: this.state.user,
      keyword: this.state.keyword.trim(),
      area: this.state.area,
      recommendations: this.state.recommendations,
      points: this.state.points
    }      
    console.log(template)
  axios.post(`${env === 'd' ? 'http://localhost:5000':''}/templates/add`,template)
    .then(res => this.componentDidMount())
  this.showAddForm()
  
  }
  editIssue(e) {
    e.preventDefault()
    let template = {
      user: this.state.user,
      keyword: this.state.editObject.keyword.trim(),
      area: this.state.editObject.area,
      recommendations: this.state.editObject.recommendations,
      points: this.state.editObject.points
    }      
    console.log(template)
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
  
    let id = this.state.issues.find(i => i.keyword === e.target.innerText)._id
    axios.delete(`${env === 'd' ? 'http://localhost:5000':''}/templates/${id}`)
    .then(res => this.componentDidMount())
    this.setState({
      issues: this.state.issues.filter(el => el._id !== id)
    })

  
  }
  chooseIssueToEdit(e) {
    let el = e.target.innerText,
    issueObject = this.state.issues.find(i => i.keyword === el)
    this.showEditForm(issueObject)  
  } 
  applyIssue(e) {

    if (!e.target.getAttribute('class').includes('added')) {
      e.target.setAttribute('class','issue added')
    } else {
      e.target.setAttribute('class','issue')
    }
      
  
        // get str of area, eg: "content"
    let area = e.target.getAttribute("area"); 
        // get array of 3 recommendations
    let issueObject = this.state.issues.find(i => i.keyword === e.target.innerText);
    let recommendations = issueObject.recommendations 
        // get 1 random 
    let oneRecommendation = ''
    while (oneRecommendation === '') {
      oneRecommendation = recommendations[Math.floor(Math.random() * recommendations.length)];
    }
        // send up to App component
    
    this.props.appendIssue(area, oneRecommendation);
    this.componentDidMount()

  }

  render() {
    let className = `Hint ${this.props.area}`,
      issues = this.state.issues.map(i => i.keyword),
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
            <h5 className='Hint__header__title'>{this.props.area}</h5>
            <div className="Hint__header__add-issue" onClick={this.showAddForm}>
               add
            </div>
          </div>
      
        <AddForm keyword={this.state.keyword} recommendations={this.state.recommendations} points={this.state.points} addIssue={this.addIssue} keywordInput={this.keywordInput} recommendationsInput={this.recommendationsInput} pointsInput={this.pointsInput} display={addDisplay}/>
        <EditForm editIssue={this.editIssue} editObject={this.state.editObject} keywordInput={this.keywordInput} recommendationsInput={this.recommendationsInput} pointsInput={this.pointsInput} display={editDisplay}/>
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

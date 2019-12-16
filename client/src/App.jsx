import React, { Component } from "react";
import {
  Header,
  Feedback,
  Hint
} from "./components";


import "./App.scss";
import axios from "axios";
let env = 'production'
class App extends Component {
    constructor(){
        super()
        this._isMounted = false
        this.state = {
            user: 'dima',
            level: '',
            area: '',
            content: [],
            structure: [],
            grammar: [],
            style: [],
            format: [],
            issues: [],
            basePoints: 100
        }
        this.appendIssue = this.appendIssue.bind(this)
        this.setUser = this.setUser.bind(this)
        this.setLevel = this.setLevel.bind(this)
        this.clearFeedback = this.clearFeedback.bind(this)
        this.countPoints = this.countPoints.bind(this)
    }
    componentDidMount(){
        this._isMounted = true
        axios.get(`${env === 'development' ? 'http://localhost:5000':''}/templates`)
        .then(res => {if (this._isMounted) this.setState({issues:res.data.filter(i => i.user === this.state.user)})})
    }
    componentWillUnmount(){
        this._isMounted = false
    }
    appendIssue(area,recommendation) {
        let isEmpty = true
        let issues = this.state.issues
        let issuesArray = this.state[area]
        let issueObject = issues.find(io => io.recommendations.includes(recommendation))
        let issueObjectRecommendations = issueObject.recommendations
        
        issueObjectRecommendations.forEach(r => {if (issuesArray.includes(r)) isEmpty = false})


        if (isEmpty) {
            issuesArray.push(recommendation)
            this.countPoints(issueObject.points, 'minus')
        }
        else {
            let issueObject = issues.find(i => i.recommendations.includes(recommendation))
            issueObject.recommendations.forEach(r => {
                if (issuesArray.includes(r)) {
                    issuesArray.splice(issuesArray.indexOf(r),1)
                    this.countPoints(issueObject.points, 'plus')

                }
               
            })
        }   
        this.setState({[area]:issuesArray})
    }
    countPoints(points,action) {
        let basePoints = this.state.basePoints,
            newPoints = (action === 'minus') ? basePoints - points : basePoints + points,
            level = ''
        switch(true) {
          case newPoints >= 0 && newPoints < 45:
           level = 'Up to 45'
            break
          
          case newPoints >= 45 && newPoints < 50:
             level = 'High School D'
            break
          case newPoints >= 50 && newPoints < 55:
          level = "High School C"
            break
          case newPoints >= 55 && newPoints < 59:
          level = "High School B"
            break
          case newPoints === 59:
          level = "High School A"
            break
         
          case newPoints >= 60 && newPoints < 63:
          level = "College D"
            break
          case newPoints >= 63 && newPoints < 66:
          level = "College C"
            break
          case newPoints >= 66 && newPoints < 69:
          level = "College B"
            break
          case newPoints === 69:
          level = "College A"
            break
    
          case newPoints >= 70 && newPoints < 73:
          level = "University D"
            break
          case newPoints >= 73 && newPoints < 76:
          level = "University C"
            break
          case newPoints >= 76 && newPoints < 79:
          level = "University B"
            break
          case newPoints === 79:
          level = "University A"
            break
    
          case newPoints >= 80 && newPoints < 85:
           level = "Master's D"
            break
          case newPoints >= 85 && newPoints < 90:
            level = "Master's C"
            break
          case newPoints >= 90 && newPoints < 94:
            level = "Master's B"
            break
          case newPoints === 94:
            level = "Master's A"
            break
          case newPoints >=95 && newPoints <= 100:
            level = "PhD"
        }
        this.setState({basePoints: newPoints})
        this.setLevel(level)
    
      }
    clearFeedback() {
        this.setState({
            level: '',
            content: [],
            structure: [],
            grammar: [],
            style: [],
            format: []
        })
    }
    setUser(user){
        this.setState({
            user: user,
            level: '',
            content: [],
            structure: [],
            grammar: [],
            style: [],
            format: []
        })
    }
    setLevel(level) {
        console.log('in App '+level)
        this.setState({level})
    }
    render() {
        // destructuring issues
        return (
        <div className="App">
            <Header user={this.state.user} setUser={this.setUser}/>
            <main className="main-container">
            <div className="left hints">
                <Hint user={this.state.user} area={'content'} countPoints={this.countPoints} appendIssue={this.appendIssue} setLevel={this.setLevel}/>
                <Hint user={this.state.user} area={'structure'} countPoints={this.countPoints} appendIssue={this.appendIssue} setLevel={this.setLevel}/>
            </div>

          
            <Feedback 
            clearFeedback = {this.clearFeedback}
            level ={this.state.level}
            content={this.state.content}
            structure={this.state.structure}
            grammar={this.state.grammar}
            format={this.state.format}
            style={this.state.style}
            /> 
           

            <div className="right hints">
                <Hint user={this.state.user} area={'grammar'} countPoints={this.countPoints} appendIssue={this.appendIssue} setLevel={this.setLevel}/>
                <Hint user={this.state.user} area={'style'} countPoints={this.countPoints} appendIssue={this.appendIssue} setLevel={this.setLevel}/>
                <Hint user={this.state.user} area={'format'} countPoints={this.countPoints} appendIssue={this.appendIssue} setLevel={this.setLevel}/>
            </div>
            </main>
        </div>
        );
    }
}

export default App;

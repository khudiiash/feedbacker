import React, { Component } from "react";
import {
  Header,
  Feedback,
  Hint
} from "./components";

import issues from './issues'

import "./App.scss";

class App extends Component {
    constructor(){
        super()
        this.state = {
            user: 'dima',
            level: '',
            content: [],
            structure: [],
            grammar: [],
            style: [],
            format: []
        }
        this.appendIssue = this.appendIssue.bind(this)
        this.setUser = this.setUser.bind(this)
        this.setLevel = this.setLevel.bind(this)
    }
    appendIssue(area,issue) {
        let issuesArray = this.state[area]
        if (!issuesArray.includes(issue)) issuesArray.push(issue)
        this.setState({area:issuesArray})
    }
    setUser(user){
        this.setState({user})
    }
    setLevel(level) {
        console.log('in App '+level)
        this.setState({level})
    }
    render() {
        // destructuring issues
        let {content,structure,grammar,format,style} = issues
        return (
        <div className="App">
            <Header user={this.state.user} setUser={this.setUser}/>
            <main className="main-container">
            <div className="left hints">
                <Hint user={this.state.user} area={'content'} issues={content} appendIssue={this.appendIssue} setLevel={this.setLevel}/>
                <Hint user={this.state.user} area={'structure'} issues={structure} appendIssue={this.appendIssue} setLevel={this.setLevel}/>
            </div>

            <Feedback 
            level ={this.state.level}
            content={this.state.content}
            structure={this.state.structure}
            grammar={this.state.grammar}
            format={this.state.format}
            style={this.state.style}
            />

            <div className="right hints">
                <Hint user={this.state.user} area={'grammar'} issues={grammar} appendIssue={this.appendIssue} setLevel={this.setLevel}/>
                <Hint user={this.state.user} area={'style'} issues={style} appendIssue={this.appendIssue} setLevel={this.setLevel}/>
                <Hint user={this.state.user} area={'format'} issues={format} appendIssue={this.appendIssue} setLevel={this.setLevel}/>
            </div>
            </main>
        </div>
        );
    }
}

export default App;

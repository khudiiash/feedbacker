import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import { Header, Feedback, Hint } from "./components";

import "./App.scss";
import axios from "axios";
let env = "p";

let modeIds = {
  'dima': '5dfb91fe1c9d4400000623a3',
  'alex':'5dfb931a1c9d4400000623a4',
  'oksana': '5dfb93291c9d4400000623a5',
  'masha':'5dfb93401c9d4400000623a6'
}


class Unauthorized extends Component {
    render() {
        return (
            <div className='unauthorized'>
                 <h4>Please, identify yourself to continue working</h4>
                 <div className="links">
                 <Link to='/dima' className='link'>Dima</Link>
                <Link to='/alex' className='link'>Alex</Link>
                <Link to='/oksana' className='link'>Okasana</Link>
                <Link to='/masha' className='link'>Masha</Link>
                 </div>
            </div>
        );
    }
}
class App extends Component {
  constructor() {
    super();
    this._isMounted = false;
    this.state = {
      user: "dima",
      level: "",
      area: "",
      content: [],
      structure: [],
      grammar: [],
      style: [],
      format: [],
      issues: [],
      basePoints: 100,
      loadedIssues: 0,
      mode: {
        content: 'paragraph',
        structure: 'list',
        grammar: 'list',
        style: 'list',
        format: 'list'
      }
    };
    this.appendIssue = this.appendIssue.bind(this);
    this.setUser = this.setUser.bind(this);
    this.setLevel = this.setLevel.bind(this);
    this.clearFeedback = this.clearFeedback.bind(this);
    this.countPoints = this.countPoints.bind(this);
    this.updateApp = this.updateApp.bind(this);
    this.sendMode = this.sendMode.bind(this);
  }
  componentDidMount() {
    this._isMounted = true;
    axios
      .get(`${env === "d" ? "http://localhost:5000" : ""}/templates`)
      .then(res => {
        if (this._isMounted)
          this.setState({
            issues: res.data.filter(i => i.user === this.state.user)
          });
          
      })
      .catch(err => console.log('templates error '+err))
    axios
      .get(`${env === "d" ? "http://localhost:5000" : ""}/preferences`)
      .then(res => {
        if (this._isMounted) {
          let obj = res.data.find(i => i.user === this.state.user)
           this.setState({
            mode: obj.mode
          });
        }
        
         
          
      })
      .catch(err => console.log('preferences error '+err))
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  appendIssue(area, recommendation) {
    let isEmpty = true;
    let issues = this.state.issues;
    let issuesArray = this.state[area];
    
    let issueObject = issues.find(io =>
      io.recommendations.includes(recommendation)
    );
    let issueObjectRecommendations = issueObject.recommendations;

    issueObjectRecommendations.forEach(r => {
      if (issuesArray.includes(r)) isEmpty = false;
    });

    if (isEmpty) {
      issuesArray.push(recommendation);
      this.countPoints(issueObject.points, "minus");
      this.setState({ [area]: issuesArray });
    } else {
      let issueObject = issues.find(i =>
        i.recommendations.includes(recommendation)
      );
      issueObject.recommendations.forEach(r => {
        if (issuesArray.includes(r)) {
          issuesArray.splice(issuesArray.indexOf(r), 1);
          this.countPoints(issueObject.points, "plus");

        }
      });
    }
    this.updateApp()
  }
  sendMode(area,mode) {
    let modeObj = this.state.mode
    modeObj[area] = mode
    
    this.setState({mode: modeObj})
    let preference = {
      user: this.state.user,
      mode: modeObj
    }      
    axios.post(`${env === 'd' ? 'http://localhost:5000':''}/preferences/update/`+modeIds[this.state.user],preference)
    .then(res => this.componentDidMount())
  }
  updateApp(user){
    this.setState({user})
    axios
      .get(`${env === "d" ? "http://localhost:5000" : ""}/templates`)
      .then(res => {
          this.setState({
            issues: res.data.filter(i => i.user === this.state.user)
          });
          this.setState({loadedIssues: this.state.loadedIssues+1})
      });
  }
  countPoints(points, action) {
    let basePoints = this.state.basePoints,
      newPoints =
        action === "minus" ? basePoints - points : basePoints + points,
      level = "";
    switch (true) {
      case newPoints <= 0:
        level = "Zero";
        break;
      case newPoints >= 0 && newPoints < 45:
        level = "Up to 45";
        break;

      case newPoints >= 45 && newPoints < 50:
        level = "High School D";
        break;
      case newPoints >= 50 && newPoints < 55:
        level = "High School C";
        break;
      case newPoints >= 55 && newPoints < 59:
        level = "High School B";
        break;
      case newPoints === 59:
        level = "High School A";
        break;

      case newPoints >= 60 && newPoints < 63:
        level = "College D";
        break;
      case newPoints >= 63 && newPoints < 66:
        level = "College C";
        break;
      case newPoints >= 66 && newPoints < 69:
        level = "College B";
        break;
      case newPoints === 69:
        level = "College A";
        break;

      case newPoints >= 70 && newPoints < 73:
        level = "University D";
        break;
      case newPoints >= 73 && newPoints < 76:
        level = "University C";
        break;
      case newPoints >= 76 && newPoints < 79:
        level = "University B";
        break;
      case newPoints === 79:
        level = "University A";
        break;

      case newPoints >= 80 && newPoints < 85:
        level = "Master's D";
        break;
      case newPoints >= 85 && newPoints < 90:
        level = "Master's C";
        break;
      case newPoints >= 90 && newPoints < 94:
        level = "Master's B";
        break;
      case newPoints === 94:
        level = "Master's A";
        break;
      case newPoints >= 95 && newPoints <= 100:
        level = "PhD";
    }
    this.setState({ basePoints: newPoints });
    this.setLevel(level);
  }
  clearFeedback() {
    let activeIssues = document.getElementsByClassName('issue')
    for (var el of activeIssues) {
      el.setAttribute('class','issue')
    }
    this.setState({
      level: "",
      content: [],
      structure: [],
      grammar: [],
      style: [],
      format: [],
      basePoints: 100
    });
  }
  setUser(user) {
    this.setState({
      user: user,
      level: "",
      content: [],
      structure: [],
      grammar: [],
      style: [],
      format: []
    });
  }
  setLevel(level) {
    this.setState({ level });
  }
  render() {
    // destructuring issues

    return (
      <Router>
        <div className="App">
            <Route exact path='/'>
               <Unauthorized/>
            </Route>
          <Route path="/dima">
            <Header user="dima" loadedIssues={this.state.loadedIssues}/>
            <main className="main-container">
              <div className="left hints">
                <Hint
                  user="dima"
                  area="content"
                  countPoints={this.countPoints}
                  appendIssue={this.appendIssue}
                  updateApp={this.updateApp}
                  sendMode={this.sendMode}
                  mode={this.state.mode}
                />
                <Hint
                  user='dima'
                  area="structure"
                  countPoints={this.countPoints}
                  appendIssue={this.appendIssue}
                  updateApp={this.updateApp}
                  sendMode={this.sendMode}
                  mode={this.state.mode}
                />
              </div>
              <Feedback
                clearFeedback={this.clearFeedback}
                level={this.state.level}
                content={this.state.content}
                structure={this.state.structure}
                grammar={this.state.grammar}
                format={this.state.format}
                style={this.state.style}
                mode={this.state.mode}
              />

              <div className="right hints">
                <Hint
                  user='dima'
                  area="grammar"
                  countPoints={this.countPoints}
                  appendIssue={this.appendIssue}
                  updateApp={this.updateApp}
                  sendMode={this.sendMode}
                  mode={this.state.mode}
                />
                <Hint
                  user='dima'
                  area="style"
                  countPoints={this.countPoints}
                  appendIssue={this.appendIssue}
                  updateApp={this.updateApp}
                  sendMode={this.sendMode}
                  mode={this.state.mode}
                />
                <Hint
                  user='dima'
                  area="format"
                  countPoints={this.countPoints}
                  appendIssue={this.appendIssue}
                  updateApp={this.updateApp}
                  sendMode={this.sendMode}
                  mode={this.state.mode}
                />
              </div>
            </main>
          </Route>

          <Route path="/alex">
            <Header user="alex"  loadedIssues={this.state.loadedIssues}/>
            <main className="main-container">
              <div className="left hints">
                <Hint
                  user="alex"
                  area="content"
                  countPoints={this.countPoints}
                  appendIssue={this.appendIssue}
                  updateApp={this.updateApp}
                  sendMode={this.sendMode}
                  mode={this.state.mode}
                />
                 <Hint
                  user='alex'
                  area="style"
                  countPoints={this.countPoints}
                  appendIssue={this.appendIssue}
                  updateApp={this.updateApp}
                  sendMode={this.sendMode}
                  mode={this.state.mode}
                />
             
              </div>
              <Feedback
                clearFeedback={this.clearFeedback}
                level={this.state.level}
                content={this.state.content}
                structure={this.state.structure}
                grammar={this.state.grammar}
                format={this.state.format}
                style={this.state.style}
                mode={this.state.mode}
              />

              <div className="right hints">
              <Hint
                  user='alex'
                  area="structure"
                  countPoints={this.countPoints}
                  appendIssue={this.appendIssue}
                  updateApp={this.updateApp}
                  sendMode={this.sendMode}
                  mode={this.state.mode}
                />
                <Hint
                  user='alex'
                  area="grammar"
                  countPoints={this.countPoints}
                  appendIssue={this.appendIssue}
                  updateApp={this.updateApp}
                  sendMode={this.sendMode}
                  mode={this.state.mode}
                />
               
                <Hint
                  user='alex'
                  area="format"
                  mode={this.state.mode}
                  countPoints={this.countPoints}
                  appendIssue={this.appendIssue}
                  updateApp={this.updateApp}
                  sendMode={this.sendMode}
                  mode={this.state.mode}
      
                />
              </div>
            </main>
          </Route>

          <Route path="/oksana" >
            <Header user="oksana" loadedIssues={this.state.loadedIssues}/>
            <main className="main-container">
              <div className="left hints">
                <Hint
                  user="oksana"
                  area="content"
                  countPoints={this.countPoints}
                  appendIssue={this.appendIssue}
                  updateApp={this.updateApp}
                  sendMode={this.sendMode}
                  mode={this.state.mode}
                />
                <Hint
                  user='oksana'
                  area="structure"
                  countPoints={this.countPoints}
                  appendIssue={this.appendIssue}
                  updateApp={this.updateApp}
                  sendMode={this.sendMode}
                  mode={this.state.mode}
                />
              </div>
              <Feedback
                clearFeedback={this.clearFeedback}
                level={this.state.level}
                content={this.state.content}
                structure={this.state.structure}
                grammar={this.state.grammar}
                format={this.state.format}
                style={this.state.style}
                mode={this.state.mode}
              />

              <div className="right hints">
                <Hint
                  user='oksana'
                  area="grammar"
                  countPoints={this.countPoints}
                  appendIssue={this.appendIssue}
                  updateApp={this.updateApp}
                  sendMode={this.sendMode}
                  mode={this.state.mode}
                />
                <Hint
                  user='oksana'
                  area="style"
                  countPoints={this.countPoints}
                  appendIssue={this.appendIssue}
                  updateApp={this.updateApp}
                  sendMode={this.sendMode}
                  mode={this.state.mode}
                />
                <Hint
                  user='oksana'
                  area="format"
                  countPoints={this.countPoints}
                  appendIssue={this.appendIssue}
                  updateApp={this.updateApp}
                  sendMode={this.sendMode}
                  mode={this.state.mode}
                />
              </div>
            </main>
          </Route>

          <Route path="/masha" >
            <Header user="masha"  loadedIssues={this.state.loadedIssues}/>
            <main className="main-container">
              <div className="left hints">
                <Hint
                  user="masha"
                  area="content"
                  countPoints={this.countPoints}
                  appendIssue={this.appendIssue}
                  updateApp={this.updateApp}
                  sendMode={this.sendMode}
                  mode={this.state.mode}
                />
                <Hint
                  user='masha'
                  area="structure"
                  countPoints={this.countPoints}
                  appendIssue={this.appendIssue}
                  updateApp={this.updateApp}
                  sendMode={this.sendMode}
                  mode={this.state.mode}
                />
              </div>
              <Feedback
                clearFeedback={this.clearFeedback}
                level={this.state.level}
                content={this.state.content}
                structure={this.state.structure}
                grammar={this.state.grammar}
                format={this.state.format}
                style={this.state.style}
                mode={this.state.mode}
              />

              <div className="right hints">
                <Hint
                  user='masha'
                  area="grammar"
                  countPoints={this.countPoints}
                  appendIssue={this.appendIssue}
                  updateApp={this.updateApp}
                  sendMode={this.sendMode}
                  mode={this.state.mode}
                />
                <Hint
                  user='masha'
                  area="style"
                  countPoints={this.countPoints}
                  appendIssue={this.appendIssue}
                  updateApp={this.updateApp}
                  sendMode={this.sendMode}
                  mode={this.state.mode}
                />
                <Hint
                  user='masha'
                  area="format"
                  countPoints={this.countPoints}
                  appendIssue={this.appendIssue}
                  updateApp={this.updateApp}
                  sendMode={this.sendMode}
                  mode={this.state.mode}
                />
              </div>
            </main>
          </Route>


        </div>
      </Router>
    );
  }
}

export default App;

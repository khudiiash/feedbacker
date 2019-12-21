import React, { Component } from "react";

import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import { Header, Feedback, Hint, Search } from "./components";

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
      },
      styles: {
        search: {
          width: '0',
          height: '0',
        }
      },
      foundAreas: []
    };
    this.appendIssue = this.appendIssue.bind(this);
    this.appendFoundIssues = this.appendFoundIssues.bind(this);
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
  appendFoundIssues(issuesArray) {

    let issueButtons = document.getElementsByClassName('issue')
    let keywords = issuesArray.map(i => i.keyword)
    let areas = issuesArray.map(i => i.area)
    let foundAreas = this.state.foundAreas
    areas = [...new Set(areas)]
    for (var button of issueButtons) {
      if (!button.getAttribute('class').includes('added') && keywords.includes(button.innerText)) {
        button.setAttribute('class','issue added')
      } else if (!keywords.includes(button.innerText)){
        button.setAttribute('class','issue')
      }     
    }
    let allPossibleRecs = issuesArray.map(i => i.recommendations)
    allPossibleRecs = [].concat.apply([], allPossibleRecs);

    areas.forEach(area => {
      let recArray = this.state[area]
        issuesArray.filter(i => i.area === area).forEach(issue => {
                   
          
        // highlight added issues
          
          let isEmptyRecs = true
          let recommendations = issue.recommendations
          let oneRecommendation = ''
          recommendations.forEach(r => {
            if (r.length) {
              isEmptyRecs = false
            }
          })
          if (!isEmptyRecs) {
            while (oneRecommendation === '') {
              oneRecommendation = recommendations[Math.floor(Math.random() * recommendations.length)];
            }
          } else {
            oneRecommendation = '' // in case no recommendations are set, return empty
          }         
            if (!recArray.includes(recommendations[0]) && !recArray.includes(recommendations[1]) && !recArray.includes(recommendations[2])) {
              
              recArray.push(oneRecommendation)
              this.countPoints(issue.points, "minus");
              this.setState({
                [area]:recArray
              })
            }
            recArray.forEach(r => {
              if (!allPossibleRecs.includes(r)) {
                recArray.splice(recArray.indexOf(r), 1);
                this.countPoints(this.state.issues.find(i => i.recommendations.includes(r)).points, "plus");
                this.setState({
                  [area]:recArray
                })
              }
            });            
        })
    })

    if (foundAreas.length > areas.length) {
      let clearArea = foundAreas[foundAreas.length-1]
      let recArray = this.state[clearArea]
      let r = recArray[0]
      this.countPoints(this.state.issues.find(i => i.recommendations.includes(r)).points, "plus");

      
      this.setState({
        [clearArea]:[]
      })

    }
   this.setState({
     foundAreas: areas
   })
  }
  appendIssue(issue) {
      let issueButtons = document.getElementsByClassName('issue')
      // highlight added issues
        for (var button of issueButtons) {
          if (button.innerText === issue.keyword) {
            if (!button.getAttribute('class').includes('added')) {
              button.setAttribute('class','issue added')
            } else {
              button.setAttribute('class','issue')
            }
          }
        }

      let issuesArray = this.state[issue.area];


      if (!issuesArray.includes(issue.recommendations[0]) && !issuesArray.includes(issue.recommendations[1]) && !issuesArray.includes(issue.recommendations[2]) ) {
        let isEmptyRecs = true
        let recommendations = issue.recommendations
        let oneRecommendation = ''
        recommendations.forEach(r => {
          if (r.length) {
            isEmptyRecs = false
          }
        })
        if (!isEmptyRecs) {
          while (oneRecommendation === '') {
            oneRecommendation = recommendations[Math.floor(Math.random() * recommendations.length)];
          }
        } else {
          oneRecommendation = '' // in case no recommendations are set, return empty
        }
        this.countPoints(issue.points, "minus");
        issuesArray.push(oneRecommendation)
        this.setState({
          [issue.area]:issuesArray
        })
        
      } else {
        issue.recommendations.forEach(r => {
          if (issuesArray.includes(r)) {
            issuesArray.splice(issuesArray.indexOf(r), 1);
            this.countPoints(issue.points, "plus");
            this.setState({
              [issue.area]:issuesArray
            })
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
  updateApp(){
    // this.setState({user})
    let user = this.state.user
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
    let search = this.state.styles.search
    let issues = this.state.issues
    return (
      <Router>
        <div className="App" >
        
            <Route exact path='/'>
               <Unauthorized/>
            </Route>
          <Route path="/dima">
          <Header user="dima" loadedIssues={this.state.loadedIssues}/>
          <Search issues={this.state.issues} style={search} appendFoundIssues={this.appendFoundIssues}/>
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
            <Search issues={this.state.issues} style={search} appendFoundIssues={this.appendFoundIssues}/>
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
            <Search issues={this.state.issues} style={search} appendFoundIssues={this.appendFoundIssues}/>

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
            <Search issues={this.state.issues} style={search} appendFoundIssues={this.appendFoundIssues}/>
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

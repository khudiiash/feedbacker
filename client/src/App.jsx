import React, { Component } from "react";

import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import { Header, Feedback, Hint, Search } from "./components";

import "./App.scss";
import axios from "axios";
let env = "d";


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
      punctuation: [],
      grammar: [],
      style: [],
      format: [],
      issues: [],
      basePoints: 100,
      loadedIssues: 0,
      mode: {
        content: '',
        punctuation: '',
        grammar: '',
        style: '',
        format: ''
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
        if (this._isMounted) {
          this.setState({
            issues: res.data
          });
        }
          
          
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
    let keywords = issuesArray.map(i => i.issue)
    let areas = issuesArray.map(i => i.area)
    let foundAreas = this.state.foundAreas
    let pointsToTake = 0, pointsToAdd = 0;
    areas = [...new Set(areas)]
    for (var button of issueButtons) {
      if (!button.getAttribute('class').includes('added') && keywords.includes(button.innerText)) {
        button.setAttribute('class','issue added')
      } else if (!keywords.includes(button.innerText)){
        button.setAttribute('class','issue')
      }     
    }
    let allComments = issuesArray.map(i => i.comment)
    allComments = [].concat.apply([], allComments);

    areas.forEach(area => {
      let recArray = this.state[area]
        issuesArray.filter(i => i.area === area).forEach(issue => {
                   
          
        // highlight added issues
          
          let isEmptyRecs = true
          let comment = issue.comment
          // recommendations.forEach(r => {
          //   if (r.length) {
          //     isEmptyRecs = false
          //   }
          // })
          // if (!isEmptyRecs) {
          //   while (oneRecommendation === '') {
          //     oneRecommendation = recommendations[Math.floor(Math.random() * recommendations.length)];
          //   }
          // } else {
          //   oneRecommendation = '' // in case no recommendations are set, return empty
          // }         
          //   if (!recArray.includes(recommendations[0]) && !recArray.includes(recommendations[1]) && !recArray.includes(recommendations[2])) {
              
          //     recArray.push(oneRecommendation)
          //     pointsToTake += issue.points;
              this.setState({
                [area]:comment
              })
          //   }
          
        })
    })

    if (foundAreas.length > areas.length) {
      let clearArea = foundAreas[foundAreas.length-1]
      let recArray = this.state[clearArea]
      let r = ''

      
      this.setState({
        [clearArea]:[]
      })

    }
   
   this.setState({
     foundAreas: areas
   })
   if (pointsToAdd) {
    this.countPoints(pointsToAdd,'plus')
   } else {
    this.countPoints(pointsToTake,'minus')
   }
   
  }
  appendIssue(issue) {
      let issueButtons = document.getElementsByClassName('issue')
      // highlight added issues
        for (var button of issueButtons) {
          if (button.innerText === issue.issue) {
            if (!button.getAttribute('class').includes('added')) {
              button.setAttribute('class','issue added')
            } else {
              button.setAttribute('class','issue')
            }
          }
        }

      let issuesArray = this.state[issue.area];
      if (!issuesArray.some(i => i._id === issue._id)) { // Append Issue Object to the Area
        issuesArray.push(issue)
      } else {
        issuesArray.splice(issuesArray.indexOf(issue),1) // Remove Issue Object from the Area (on repeated click)
      }



      
        this.setState({
          [issue.area]:issuesArray
        })
        
      // } else {
        // issue.recommendations.forEach(r => {
        //   if (issuesArray.includes(r)) {
        //     issuesArray.splice(issuesArray.indexOf(r), 1);
        //     this.countPoints(issue.points, "plus");
        //     this.setState({
        //       [issue.area]:issuesArray
        //     })
        //   }
        // });
      // }
       
    this.updateApp()
  }
  sendMode(area,mode) {
    let modeObj = this.state.mode
    console.log(modeObj)
    console.log(area+' '+mode)
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
    // let searchInput = document.getElementById('searchIssues')
    // searchInput.value=''

    this.setState({
      level: "",
      content: [],
      punctuation: [],
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
      punctuation: [],
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
        <div className="App" >
        
          
          <Header user="dima" loadedIssues={this.state.loadedIssues}/>
          {/* <Search issues={issues} style={search} appendFoundIssues={this.appendFoundIssues}/> */}
            <main className="main-container">
              <div className="left hints">
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
                  area="punctuation"
                  countPoints={this.countPoints}
                  appendIssue={this.appendIssue}
                  updateApp={this.updateApp}
                  sendMode={this.sendMode}
                  mode={this.state.mode}
                />
              </div>
              <Feedback
                clearFeedback={this.clearFeedback}
                setUser={this.setUser}
                level={this.state.level}
                content={this.state.content}
                punctuation={this.state.punctuation}
                grammar={this.state.grammar}
                format={this.state.format}
                style={this.state.style}
                mode={this.state.mode}
                user='dima'
              />

              <div className="left hints">
               
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
         
        </div>

    );
  }
}
function parallax(event) {
	this.querySelectorAll('.Hint__header__title').forEach(layer => {
    let speed = layer.getAttribute('data-speed');
    layer.style.backgroundPositionX = `${Math.floor(event.clientX*speed/50)-200}px`
    layer.style.backgroundPositionY = `${Math.floor(event.clientY*speed/50)+320}px;`
     
	})
}

document.addEventListener('mousemove', parallax)

export default App;


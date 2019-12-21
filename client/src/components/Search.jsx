import React, { Component } from 'react';

class Search extends Component {
    constructor(props){
        super(props)
        this.state = {
            issues: props.issues,
            input: ''
        }
        this.handleInput = this.handleInput.bind(this)
    }
    handleInput(e){
        let issues = this.state.issues
        let input = e.target.value
        this.setState({input:e.target.value})
        let foundIssues = issues.filter(i => input.includes(i.keyword))

       
        this.props.appendFoundIssues(foundIssues)

          
    }
    componentDidMount(){
        if (this.props.style.width !== '0') {
            this.inputElement.focus(); 
        }
       
    }
    componentDidUpdate(prevProps,prevState) {
        if (prevProps.issues !== this.props.issues) {
            this.setState({issues: this.props.issues})
            this.componentDidMount()
        }
    }
    render() {
        return (
            <div className='Search' style={this.props.style}>
                <input 
                ref={(input) => { this.inputElement = input }}
                className='Search__input' 
                id='searchIssues' 
                onChange={this.handleInput} 
                placeholder='Search'></input>                    
            </div>
        );
    }
}

export default Search;
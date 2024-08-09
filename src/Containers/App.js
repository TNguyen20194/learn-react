import React, { Component } from 'react'
import CardList from '../Components/CardList'
import SearchBox from '../Components/SearchBox'
import Scroll from '../Components/Scroll'
// non-default export of object from robot.js => use destructuring syntax
import './App.css'

class App extends Component {
  constructor () {
    super()
    //the state is what changes in the App & describes the App
    // React uses this state to render the App - passes the state down as props to the components
    this.state = {
      robots: [],
      searchfield: ''
    }
  }

  //Lifecycle hook
  // Updating state after fetching data from an API
  componentDidMount () {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({ robots: users }))
  }

  onSearchChange = event => {
    // Update state.searchfield value using setState()
    this.setState({ searchfield: event.target.value })
  }

  render () {
    const { robots, searchfield } = this.state;
    // Filter robots state to now what includes in the searchfield
    const filteredRobots = robots.filter(robot => {
      return robot.name
        .toLowerCase()
        .includes(searchfield.toLowerCase())
    })
    return !robots.length ?
    <h1 className='tc'>Loading...</h1> :
    (
        <div className='tc'>
          <h1 className='f1'>Robofriends</h1>
          <SearchBox searchChange={this.onSearchChange} />
          <Scroll>
            <CardList robots={filteredRobots} />
          </Scroll>
        </div>
      )
  }
}

export default App

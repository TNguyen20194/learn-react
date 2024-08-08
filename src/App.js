import React, { Component } from 'react'
import CardList from './CardList'
import SearchBox from './SearchBox'
// non-default export of object from robot.js => use destructuring syntax
import { robots } from './robots'

class App extends Component {
  constructor () {
    super()
    //the state is what changes in the App & describes the App
    // React uses this state to render the App - passes the state down as props to the components
    this.state = {
      robots: robots,
      searchfield: ''
    }
  }


  onSearchChange = (event) => {
    // Update state.searchfield value using setState()
    this.setState({searchfield: event.target.value})
  }

  render () {
    // Filter robots state to now what includes in the searchfield
    const filteredRobots = this.state.robots.filter(robots => {
        return robots.name
          .toLowerCase()
          .includes(this.state.searchfield.toLowerCase())
      })
    return (
      <div className='tc'>
        <h1>Robofriends</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <CardList robots={filteredRobots} />
      </div>
    )
  }
}

export default App

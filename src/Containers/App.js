import React, { useState, useEffect } from 'react'
import CardList from '../Components/CardList'
import SearchBox from '../Components/SearchBox'
import Scroll from '../Components/Scroll'
import ErrorBoundary from '../Components/ComponentBoundary'
// non-default export of object from robot.js => use destructuring syntax
import './App.css'

function App () {
  // constructor () {
  //   super()
  //the state is what changes in the App & describes the App
  // React uses this state to render the App - passes the state down as props to the components
  //   this.state = {
  //     robots: [],
  //     searchfield: ''
  //   }
  // }

  // set state and the function that will update the state
  // using array destrcturing to customize the name of the state and the function to change the state
  const [robots, setRobots] = useState([]) //Initial robot state
  const [searchfield, setSearchField] = useState('') //Initial searchfield state

  //By default, React runs useEffect() eveytime it renders (when App renders)
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users =>  {setRobots(users)});
  }, [])

  //Lifecycle hook
  // Updating state after fetching data from an API
  // componentDidMount () {
  //   fetch('https://jsonplaceholder.typicode.com/users')
  //     .then(response => response.json())
  //     .then(users => this.setState({ robots: users }))
  // }

  const onSearchChange = event => {
    // Update state.searchfield value using setState()
    setSearchField(event.target.value)
  }
  // const { robots, searchfield } = this.state
  // Filter robots state to now what includes in the searchfield
  const filteredRobots = robots.filter(robot => {
    return robot.name.toLowerCase().includes(searchfield.toLowerCase())
  })
  return !robots.length ? (
    <h1 className='tc'>Loading...</h1>
  ) : (
    <div className='tc'>
      <h1 className='f1'>Robofriends</h1>
      <SearchBox searchChange={onSearchChange} />
      <Scroll>
        <ErrorBoundary>
          <CardList robots={filteredRobots} />
        </ErrorBoundary>
      </Scroll>
    </div>
  )
}

export default App

import React from 'react'
import {BrowserRouter as Router, Switch,Route} from "react-router-dom"
import CreateRoomPage from './CreateRoomPage'
import RoomJoinPage from './RoomJoinPage'

function HomePage() {
  return (
    <Router>
    <Switch>
      <Route exact path="/">
        <p>This is the home page</p>
      </Route>
      <Route path="/join" component={RoomJoinPage} />
      <Route path="/create" component={CreateRoomPage} />
    </Switch>
  </Router> 
  )
}

export default HomePage
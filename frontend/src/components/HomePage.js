import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import CreateRoomPage from './CreateRoomPage'
import RoomJoinPage from './RoomJoinPage'

function HomePage() {
  return (
    <Router>
        <Routes>
            <Route exact path="/"><h1>This is the home page</h1></Route>
            <Route path="/join" component={RoomJoinPage}/>
            <Route path="/create" component={CreateRoomPage}/>
        </Routes>
    </Router>
  )
}

export default HomePage
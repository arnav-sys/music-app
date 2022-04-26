import React from 'react'
import {BrowserRouter as Router, Switch,Route, Link} from "react-router-dom"
import CreateRoomPage from './CreateRoomPage'
import RoomJoinPage from './RoomJoinPage'
import Room from "./Room"
import { Grid, Typography, Button,ButtonGroup } from '@mui/material'

function HomePage() {
  function renderHomePage(){
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <Typography variant="h3" compact="h3">
            House Party
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button color="primary" to="/join" component={Link}>
              Join a Room
            </Button>
            <Button color="primary" to="/create" component={Link}>
              Create a room
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    )
  }
  return (
    <Router>
    <Switch>
      <Route exact path="/">
        {renderHomePage()}
      </Route>
      <Route path="/join" component={RoomJoinPage} />
      <Route path="/create" component={CreateRoomPage} />
      <Route path="/room/:roomCode" component={Room}/>
    </Switch>
  </Router> 
  )
}

export default HomePage
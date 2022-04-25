import React from 'react'
import {TextField, Button, Grid, Typography} from "@mui/material"
import {Link} from "react-router-dom"
import { useState } from 'react'

function RoomJoinPage() {
  const [roomCode,setRoomCode] = useState("")
  const [error, setError] = useState("")
  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item  xs={12}>
        <Typography variant="h4" component="h4">
          Join a Room
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField error={error} label="Code" placeholder="Enter a Room Code" value={roomCode} helperText={error} variant="outlined"/>
      </Grid>
    </Grid>
  )
}

export default RoomJoinPage
import React from 'react'
import {TextField, Button, Grid, Typography} from "@mui/material"
import {Link} from "react-router-dom"
import { useState } from 'react'

function RoomJoinPage(props) {
  const [roomCode,setRoomCode] = useState("")
  const [error, setError] = useState("")

  function handleClick(){
    const requestOptions = {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({
        code:roomCode
      })
    }
    fetch("http://127.0.0.1:8000/api/joinroom",requestOptions).then((response) => {
      if (response.ok){
        props.history.push(`/room/${roomCode}`)
      }else{
        setRoomCode({error:"Room not found"})
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  function handleTextFieldChange(e){
    setRoomCode(e.target.value)
  }

  return (
    <Grid container spacing={1}>
      <Grid item align="center"  xs={12}>
        <Typography variant="h4" component="h4">
          Join a Room
        </Typography>
      </Grid>
      <Grid align="center" item xs={12}>
        <TextField error={error} label="Code" onChange={handleTextFieldChange} placeholder="Enter a Room Code" value={roomCode} helperText={error} variant="outlined"/>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="primary" onClick={handleClick}>Enter room</Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" to="/" component={Link}>Back</Button>
      </Grid>
    </Grid>
  )
}

export default RoomJoinPage
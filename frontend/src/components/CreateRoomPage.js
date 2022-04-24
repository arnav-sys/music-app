import React from 'react'
import {Link} from "react-router-dom"
import {Button,Grid, Typography, TextField, Radio,FormControlLabel, RadioGroup, FormControl,FormHelperText} from '@mui/material/';
import { useState } from 'react';

function CreateRoomPage() {
  let defaultVotes = 2;
  const [guestCanPause, setGuestCanPause] = useState(false)
  const [votesToSkip,setVotesToSkip] = useState(defaultVotes)

  function handleRoomButtonPressed(){
    const requestOptions ={
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({
        votes_to_skip:votesToSkip,
        guest_can_pause:guestCanPause
      })
    }
    fetch("http://127.0.0.1:8000/api/createroom",requestOptions).then((response) => response.json()).then((data) => console.log(data))
  }

  function setpause(e){
    setGuestCanPause(e.target.value)
  }

  function setvotes(e){
    setVotesToSkip(e.target.value)
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component='h4' vairant="h4">Create a Room</Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText>
            <div align="center">Guest Control of Payback State</div>
          </FormHelperText>
          <RadioGroup onChange={setpause} row defaultValue='true'>
            <FormControlLabel value="true" label="Play/Pause" labelPlacement="bottom"  control={<Radio color="primary"/>}></FormControlLabel>
            <FormControlLabel value="false" label="No Control" labelPlacement="bottom"  control={<Radio color="secondary"/>}></FormControlLabel>
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl>
          <TextField required={true} type="number" defaultValue={defaultVotes} onChange={setvotes} inputProps={{min:1,style:{textAlign:"center"}}}/>
          <FormHelperText><div align="center">Votes required to skip song</div></FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <Button onClick={handleRoomButtonPressed} color="primary" varaint="contained">Create A room</Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="secondary" varaint="contained" to="/" component={Link}>Back</Button>
      </Grid>
    </Grid>
  )
}

export default CreateRoomPage
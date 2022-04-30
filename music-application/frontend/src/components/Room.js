import React, { Component } from "react";
import {Grid, Button, Typography} from "@material-ui/core"
import CreateRoomPage from "./CreateRoomPage";

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votesToSkip: 2,
      guestCanPause: false,
      isHost: false,
      showSettings:false,
      song:{},
      spotifyAuthenticated:false,
    };
    this.roomCode = this.props.match.params.roomCode;
    this.getRoomDetails();
    this.getCurrentSong()
    this.leaveButtonPressed = this.leaveButtonPressed.bind(this)
    this.updateShowSettings = this.updateShowSettings.bind(this)
    this.renderSettingsButton = this.renderSettingsButton.bind(this)
    this.renderSettings = this.renderSettings.bind(this)
    this.authenticateSpotify = this.authenticateSpotify.bind(this)
  }

  getRoomDetails() {
    fetch("/api/get-room" + "?code=" + this.roomCode)
      .then((response) => {
        if (!response.ok){
          this.props.leaveRoomCallBack()
          this.props.history.push("/")
        }
        return         response.json()
      })
      .then((data) => {
        this.setState({
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        });
        if(this.state.isHost){
          this.authenticateSpotify()
        }
      });
  }

  authenticateSpotify(){
    fetch("/spotify/is-authenticated").then((response) => response.json()).then((data) => {
      this.setState({spotifyAuthenticated:data.status})
      if (!data.status){
        fetch("/spotify/get-auth-url").then((response) => response.json()).then((data) => {
          window.location.replace(data.url)
        })
      }
      })
  }

  getCurrentSong(){
    fetch("/spotify/current-song").then((response) => {
      if (!response.ok){
        return {}
      }else{
        return response.json()
      }
    }).then((data) =>  this.setState({song:data}))
  }

  updateShowSettings(value){
    this.setState({
      showSettings:value,
    })
  }

  renderSettings(){
    return (<Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <CreateRoomPage updateCallback={this.getRoomDetails} guestCanPause={this.state.guestCanPause} roomCode={this.roomCode} update={true} votesToSkip={this.state.votesToSkip}/>
      </Grid>
      <Grid item xs={12} align="center">
      <Button color="secondary" variant="contained" onClick={() => this.updateShowSettings(false)}>
        Close
          </Button>
      </Grid>
    </Grid>)
  }

  renderSettingsButton(){
    if (this.state.isHost == true){
      return (
        <Grid item xs={12} align="center">
          <Button color="primary" variant="contained" onClick={() => this.updateShowSettings(true)}>
            Settings
          </Button>
        </Grid>
      )
    } 
  }

  leaveButtonPressed(){
    const requestOptions = {
      method:"POST",
      headers:{"Content-Type":"application/json"},
    }
    fetch("/api/leave-room",requestOptions).then((response) => response.json()).then(
      () => {
        this.props.leaveRoomCallback()
        this.props.history.push("/")
      }
    )
  }

  render() {
    if(this.state.showSettings){
      return this.renderSettings();
    }
    console.log("Working")
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">
            Code: {this.roomCode.toString()}
          </Typography>
        </Grid>
        {this.renderSettingsButton()}
        <Grid item xs={12} align="center">
          <Button onClick={this.leaveButtonPressed} variant="contained"color="secondary">
            Leave Room
          </Button>
        </Grid>
      </Grid>
    );
  }
}

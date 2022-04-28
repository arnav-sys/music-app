import React, { Component } from "react";
import {Grid, Button, Typography} from "@material-ui/core"
import { Link } from "react-router-dom";

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votesToSkip: 2,
      guestCanPause: false,
      isHost: false,
    };
    this.roomCode = this.props.match.params.roomCode;
    this.getRoomDetails();
    this.leaveButtonPressed = this.leaveButtonPressed.bind(this)
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
      });
  }

  leaveButtonPressed(){
    const requestOptions = {
      method:"POST",
      headers:{"Content-Type":"application/json"},
    }
    fetch("/api/leave-room",requestOptions).then((response) => response.json()).then(
      (data) => {
        this.props.leaveRoomCallback()
        this.props.history.push("/")
      }
    )
  }

  render() {
    console.log("Working")
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">
            Code: {this.roomCode}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6" component="h6">
            guestCanPause: {this.guestCanPause}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6" component="h6">
            isHost: {this.isHost}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Button onClick={this.leaveButtonPressed} variant="contained"color="secondary">
            Leave Room
          </Button>
        </Grid>
      </Grid>
    );
  }
}

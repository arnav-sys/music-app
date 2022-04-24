import React from 'react'
import { useState } from 'react'

function Room(props) {
  const [votesToSkip,setVotesToSkip] = useState(2)
  const [guestCanPause,setGuestCanPause] = useState(false)
  const [isHost, setIsHost] =useState(false)
  let roomCode = props.match.params.roomCode

  function getRoomDetails(){
      fetch("http://127.0.0.1:8000/api/getroom" + "?code=" + roomCode).then((response) => response.json()).then(function(data){
        setVotesToSkip(data.votes_to_skip)
        setGuestCanPause(data.guest_can_pause)
        setIsHost(data.is_host)
      }
      )
  }
  getRoomDetails()
  return (
    <div>
        <h3>{roomCode}</h3>
        <p>votes: {votesToSkip}</p>
        <p>guestCanPause: {guestCanPause.toString()}</p>
        <p>isHost: {isHost.toString()}</p>
    </div>
  )
}

export default Room
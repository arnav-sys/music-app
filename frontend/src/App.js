import { useState } from 'react';
import './App.css';
import CreateRoomPage from './components/CreateRoomPage';
import HomePage from './components/HomePage';
import RoomJoinPage from './components/RoomJoinPage';

function App(props) {
  return (
    <div className="App">
      <HomePage/>
      <RoomJoinPage/>
      <CreateRoomPage/>
    </div>
  );
}

export default App;

import { useState } from 'react';
import './App.css';
import "./style.css"
import CreateRoomPage from './components/CreateRoomPage';
import HomePage from './components/HomePage';
import RoomJoinPage from './components/RoomJoinPage';

function App(props) {
  return (
    <div className="center">
      <HomePage/>
    </div>
  );
}

export default App;

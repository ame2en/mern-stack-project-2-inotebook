import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from "./components/Home";
import About from './components/About';
import {NoteState} from './context/notes/noteState.js';
import Alerts from './components/Alerts.js';
import {Signup} from './components/Signup.js';
import { Login } from './components/Login.js';
import { useState } from 'react';



function App() {
  const [alert,setAlert] = useState(null);
  const showAlert = (message,type)=>{
    setAlert({
      msg:message,
      type:type
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
      <NoteState >
      <Router>
        <Navbar/>
        <Alerts alert={alert}/>
        <div className="container">
        <Routes>

            <Route exact path="/about" element={<About/>} />
            <Route exact path="/" element={<Home showAlert={showAlert}/> } />
            <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
            <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
        </Routes>
        </div>
      </Router>   
      </NoteState>
      
    </>
  );
}

export default App;

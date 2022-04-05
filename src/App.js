// import logo from './logo.svg';
// import './App.css';
// import afd from '../../../src/media/images/logo.svg';

import {Routes, Route, useNavigate} from "react-router-dom";
// import { BrowserRouter as Router, Switch, Routes, Route, Link} from "react-router-dom";

import TopBar from "./components/topbar/TopBar";
import Home from "./pages/home/Home";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Sidebar from './components/sidebar/Sidebar'
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";


function AppIntermediate() {
  return (
    <div className="App">
      <TopBar />
      <Home />
    </div>
  )
}

function App() {

  const userIsLoggedIn = true;
  // const userIsLoggedIn = false;
  return (
    <Routes>
      <Route path='/' element={<AppIntermediate/>} />
      {/* <Route path='/home' element={<AppIntermediate/>} /> */}
      <Route path='/register' element={userIsLoggedIn ? <Register/> : <Register/>} />
      <Route path='/login' element={userIsLoggedIn ? <Login/> : <Login/>} />
      <Route path='/write' element={userIsLoggedIn ? <Write/> : <Login/> } />
      <Route path='/settings' element={userIsLoggedIn ? <Settings/> : <Login/> } />
      <Route path='/post/:postID' element={<Single/>} />
    </Routes>
  );
}

export default App;

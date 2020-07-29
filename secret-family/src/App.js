import React from 'react';
import { Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';

import './App.css';

function App() {
  return (
    <div className="App">
     <Route path='/signup' component={Signup}></Route>
     <Route path='/login' component={Login}></Route>
    </div>
  );
}

export default App;

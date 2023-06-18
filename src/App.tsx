import React, {createElement as e} from 'react'
import { Routes, Route } from 'react-router-dom';
import {Login} from './components/Login'
import {Register} from './components/Register'

function App(){
  return (
    <div className="app">
      <Login />
      <Routes>
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
       </Routes>
    </div>
  )
}
export default App;

import React from 'react'
import './App.css'
import HomePage from './components/HomePage'
import Account from './components/Account'
import Registration from './components/Registration'
import Login from './components/Login'
import { BrowserRouter as Router, Routes, Route, Link, Redirect } from 'react-router-dom'
import AuthContext from "./context/AuthContext"

function App() {
  const [isAuthenticated, setIsAuthentificated] = React.useState(false);

  return (
    <AuthContext.Provider value={{ setIsAuthentificated }}>
      <Router>
        <Routes>
          <Route exact path='/' element={isAuthenticated ? <HomePage /> : <Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/account' element={<Account />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App

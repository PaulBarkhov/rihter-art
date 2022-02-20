import React from 'react'
import './App.css'
import HomePage from './screens/HomePage'
import Account from './screens/Account'
import Registration from './screens/auth/Registration'
import Login from './screens/auth/Login'
import { BrowserRouter as Router, Routes, Route, Link, Redirect } from 'react-router-dom'
import AuthContext from "./context/AuthContext"

function App() {
  const [loading, setLoading] = React.useState(true)
  const [isAuthenticated, setIsAuthentificated] = React.useState(false)

  React.useEffect(() => {
    fetch('http://192.168.2.114:8000/auth')
      .then(res => res.json())
      .then(res => res.isAuthenticated && setIsAuthentificated(true))
      .then(setLoading(false))
  }, [])

  if (loading) (<h1>Шалом!</h1>)

  return (
    <AuthContext.Provider value={{ setIsAuthentificated }}>
      <Router>
        <Routes>
          <Route exact path='/' element={isAuthenticated ? <HomePage /> : <Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/home' element={isAuthenticated ? <HomePage /> : <Login />} />
          <Route path='/account' element={isAuthenticated ? <Account /> : <Login />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App

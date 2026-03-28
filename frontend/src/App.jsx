import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'

import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/register' element={<Register />}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

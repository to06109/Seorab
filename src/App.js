import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './routes/Home'
import Login from './routes/Login'
import Register from './routes/Register'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App

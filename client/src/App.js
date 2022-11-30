import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './routes/Home'
import Login from './routes/Login'
import Register from './routes/Register'
import Content from './routes/Content'
import EditContent from './routes/EditContent'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contents/:id" element={<Content />} />
        <Route path="/contents/:id/edit" element={<EditContent />} />
      </Routes>
    </Router>
  )
}

export default App

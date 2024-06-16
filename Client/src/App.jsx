import { Route, Routes } from 'react-router-dom'
import Todo from './assets/Todo'
import Register from './Componenet/Register'
import Login from './Componenet/Login'
import HomePage from './assets/HomePage'
import PrivateRoute from './Routes/Private'
import ForgotPassword from './Componenet/ForgotPassword'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/todo" element={<PrivateRoute />}>
          <Route path="" element={<Todo />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </>
  )
}

export default App

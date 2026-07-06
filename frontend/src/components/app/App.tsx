import './App.css'
import Layout from '../layout/layout/Layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Auth from '../auth/auth/Auth'
import RequireAuth from '../auth/require-auth/RequireAuth'
import Login from '../auth/login/Login'
import Signup from '../auth/signup/Signup'
import { Toaster } from 'react-hot-toast'


function App() {

  return (
    <>
      <Toaster position="top-center" />
      <BrowserRouter>
        <Auth>
          <Routes>
            {/*Public */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected */}
            <Route path="/*"
              element={
                <RequireAuth>
                  <Layout />
                </RequireAuth>
              }
            />
          </Routes>
        </Auth>
      </BrowserRouter>
    </>
  )
}

export default App

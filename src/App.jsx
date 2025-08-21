import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './appwrite/authSlice'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((user) => {
        if (user) {
          dispatch(login(user))
        } 
        else {
          dispatch(logout());
          }
        })
        .finally(() => setLoading(false))
      }, [dispatch])

  return !loading ? (
    <>
     <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
      <Header></Header>
      <main>
      Todo:  {/* <Outlet /> */}
      </main>
      <Footer></Footer>
      </div>
     </div>
    </>
  ) : null
}

export default App

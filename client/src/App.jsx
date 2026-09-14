import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import CarDetails from './pages/CarDetails'
import Cars from './pages/Cars'
import MyBookings from './pages/MyBookings'
import Footer from './components/Footer'
import Layout from './pages/owner/Layout'
import Dashboard from './pages/owner/Dashboard'
import AddCar from './pages/owner/AddCar'
import ManageCars from './pages/owner/ManageCars'
import ManageBookings from './pages/owner/ManageBookings'
import Login from './components/Login'
import { Toaster } from 'sonner'
import { useAppContext } from './context/AppContext'
import ScrollToTop from './components/ScrollToTop'

const App = () => {

  const {showLogin, user} =useAppContext()
  const isOwnerPath = useLocation().pathname.startsWith('/owner')

  return (
    <>
    <ScrollToTop />
      <Toaster position='top-right' richColors toastOptions={{style: { marginTop: '70px'}}}/>
      {showLogin && <Login />}    
      {!isOwnerPath && <Navbar/>}

     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/car-details/:id' element={<CarDetails/>}/>
      <Route path='/cars' element={<Cars/>}/>
      <Route path='/my-bookings' element={<MyBookings/>}/>

      <Route path='/owner' element={ user ? <Layout /> : <Navigate to="/" />}>
      <Route index element={<Dashboard />} />
      <Route path='add-car' element={<AddCar />} />
      <Route path='manage-cars' element={<ManageCars />} />
      <Route path='manage-bookings' element={<ManageBookings />} />
      </Route>

     </Routes>

     {!isOwnerPath &&  <Footer /> }
     
    </>
  )
}

export default App

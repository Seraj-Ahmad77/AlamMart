import React from 'react'
import {Route,Routes} from "react-router-dom"
import Home from './pages/Home'
import Collection from './pages/Collection'
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import PlaceOrders from './pages/PlaceOrders'
import Contact from './pages/Contact'
import About from './pages/About'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import Product from './pages/Product'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'
import MyProfile from './pages/MyProfile'

const App = () => {
  return (
        <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
          <ToastContainer/>
          <Navbar/>
          <SearchBar/>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/collection' element={<Collection/>}/>
              <Route path='/cart' element={<Cart/>}/>
              <Route path='/orders' element={<Orders/>}/>
              <Route path='/place-order' element={<PlaceOrders/>}/>
              <Route path='/contact' element={<Contact/>}/>
              <Route path='/about' element={<About/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/product/:productId' element={<Product/>}/>
              <Route path='/verify' element={<Verify/>}/>
              <Route path="/my-profile" element={<MyProfile />} />
              
            </Routes>
            <Footer/>
        </div>
  )
}

export default App
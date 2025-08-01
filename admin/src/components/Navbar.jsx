import React from 'react'
import { assets}  from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className=' flex items-center justify-between py-2 px-[4%]'>
        <img src={assets.logo1} className='w-15 h-15 rounded-full' alt="" />
        <button onClick={()=>setToken("")} className=' bg-gray-600 text-white px-5 py-2 sm:px-7 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar
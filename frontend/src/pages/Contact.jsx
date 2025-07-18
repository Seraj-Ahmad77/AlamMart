import React from 'react'
import { assets } from '../assets/assets'
import NewLetterBox from "..//components/NewLetterbox"
import Title from '../components/Title'

const Contact = () => {
  return (
    <div>
      <div className=' text-center text-2xl pt-10 border-t'>
        <Title text1={"CONTACT"} text2={"US"}/>
      </div>
      <div className=' my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img src={assets.contact_img} className=' w-full md:max-w-[480px]' alt="" />
        <div className=' flex flex-col justify-center items-start gap-6'>
          <p className=' font-semibold text-gray-600 text-xl'>Our Store</p>
          <p className='text-gray-500'>Loharson,Block Santha,272270 Sant Kabeer Nagar <br /> U.P (INDIA)</p>
          <p className=' text-gray-600'>Tel:770429233 <br />serajansari7704@gmail.com</p>
          <p className=' font-semibold text-xl text-gray-600'>Careers at forever</p>
          <p className='  text-gray-600'>Learn more about our teams ,and job opputunities</p>
           <button className=' border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500' >Explore jobs</button>
        </div>
      </div>

      <NewLetterBox/>
    </div>
  )
}

export default Contact
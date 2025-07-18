
import React from 'react';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import NewLetterBox from '../components/NewLetterbox';

const About = () => {
  return (
    <div>
      {/* ABOUT US TITLE */}
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      {/* ABOUT CONTENT */}
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img
          src={assets.hero_img1}
          className='w-full md:max-w-[450px]'
          alt="Premium Bedsheet"
        />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>
            At our core, we believe that comfort and style should go hand in hand. That's why we’re committed to bringing you thoughtfully designed home essentials that combine quality craftsmanship with elegant aesthetics.
          </p>
          <p>
            From soft, breathable fabrics to durable stitching and timeless patterns, our products are curated to elevate your everyday living experience. Whether you're revamping your bedroom or looking for cozy additions to your space, we’ve got you covered.
          </p>
          <b className='text-gray-800'>OUR MISSION</b>
          <p>
            Our mission is to enhance the comfort of every home through products that reflect care, detail, and design. We aim to build lasting trust with our customers by delivering quality you can feel and service you can rely on.
          </p>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className='text-xl py-4'>
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border-gray-300 border px-10 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-800'>
            We use premium materials and follow strict quality control processes to ensure every product meets our high standards—so you get comfort that lasts.
          </p>
        </div>
        <div className='border-gray-300 border px-10 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-800'>
            Enjoy a seamless shopping experience with easy navigation, fast delivery, and flexible return policies—all designed with your ease in mind.
          </p>
        </div>
        <div className='border-gray-300 border px-10 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-800'>
            Our support team is here to assist you every step of the way. From pre-order questions to post-purchase help, your satisfaction is our priority.
          </p>
        </div>
      </div>

      {/* NEWSLETTER BOX */}
      <NewLetterBox />
    </div>
  );
};

export default About;

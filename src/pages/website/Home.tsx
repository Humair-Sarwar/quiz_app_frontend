import React from 'react'
import hero_banner_image from '../../assets/images/hero-banner.png'

const Home: React.FC = () => {
  return (
    <>
      <section id='hero-section' className='bg-[#fff5ed]'>
        <div className='container mx-auto flex justify-between items-center min-h-[88vh] px-4 max-w-[1400px]'>
        <div className='my-8'>
            <h1 className='text-5xl font-bold leading-tight'>Unlock Exclusive <br /> Rewards as <span className='primary-color-text'>You Win</span></h1>
            <p className='text-[#8b8b8b] my-5'>Lorem, ipsum dolor sit amet consectetur adipisicing <br /> elit. Molestiae, quasi minima magnam voluptatum totam unde?</p>
            <button className='primary-button mt-3'>Start Solving</button>
        </div>
        <div>
            <img src={hero_banner_image} className='h-[600px]' alt="" />
        </div>
        </div>
      </section>
      <section id='categories'>

      </section>
    </>
  )
}

export default Home

import React from 'react'
import './Hero.css'


function Hero() {
  return (
    <section className='hero'>
      <div className='main'>
       <div className='main-box'>
          <div className='main-section'>
              <h2>Track your pet <br />Daily Activity</h2>
              <button>
                Today Acitivity
              </button>
          </div>
        <img className='image' src='src/assets/petimage2.png' alt="" />
       </div>
      </div>
       <div className='bot'>
          Bot
       </div>
    </section>
  )
}

export default Hero
import React from 'react'
import './Home.css'
import Header from '../../components/HeaderSection/Header'
import Hero from '../../components/HeroSection/Hero'

function Home() {
  return (
    <section className='home'>
       <Header />
       <section className='hero'>
           <Hero />
       </section>
    </section>
  )
}

export default Home
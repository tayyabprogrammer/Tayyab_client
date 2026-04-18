import React from 'react'
import Navbar from '../Components/ui/Navbar'
import Hero from '../Components/Sections/Hero'
import Skills from '../Components/Sections/Skills'
import Projects from '../Components/Sections/Projects'
import About from '../Components/Sections/About'
import Reviews from '../Components/Sections/Reviews'

const Home = () => {
  return (
    <div className="app"> 
    <section id="home"><Hero /></section>
    <section id="about"><About/></section>
    <section id="skills"><Skills /></section>
    <section id="projects"><Projects /></section>
    <section id="reviews"><Reviews /></section>

  </div>
  )
}

export default Home

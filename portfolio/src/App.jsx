import Navbar from "./components/Navbar";
import About from "./sections/About";

import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import Home from "./sections/Home";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Testimonial from "./sections/Testimonial";
import ParticlesBackground from "./components/ParticlesBackground";
import CustomCursor from "./components/CustomCursor";


import{useState} from "react"
import IntroAnimation from "./components/IntroAnimation";


export default function App() {

  const [introDone, setIntroDone] = useState(false)
  return (
    <>
    {!introDone && <IntroAnimation onFinish={()=>setIntroDone(true)}/>}

      {introDone&&(
        <div className='relative gradient text-white'>
     {/* <ParticlesBackground/>*/}
      <CustomCursor/>
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Projects />
      <Testimonial />
      <Contact />
      <Footer />



    </div>)}
    
    </>
  )



}
import Navbar from "./components/Navbar";
import About from "./sections/About";
import Experiences from "./sections/Experiences";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import Home from "./sections/Home";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Testimonial from "./sections/Testimonial";
import ParticlesBackground from "./components/ParticlesBackground";
import CustomCursor from "./components/CustomCursor";




export default function App() {
  return (
    <div className='relative gradient text-white'>
     {/* <ParticlesBackground/>*/}
      <CustomCursor/>
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Projects />
      <Experiences />
      <Testimonial />
      <Contact />
      <Footer />



    </div>
  )



}
import { useEffect,useState,useRef,useMemo } from "react"

import { motion, useMotionValue, useMotionValueEvent } from "framer-motion"
import img1 from "../assets/img1.png"
import img2 from "../assets/img2.jpg"
import img3 from "../assets/img3.png"
import photo1 from "../assets/photo1.png"
import photo3 from "../assets/photo3.png"
import { useScroll } from "framer-motion"


const useIsMobile=(query="(max-width:639px)")=>{
  const [isMobile, setIsMobile] = useState(
    typeof window!=="undefined" && window.matchMedia(query).matches
  )
  useEffect(()=>{
    if(typeof window==="undefined")return;
    const mql=window.matchMedia(query)
    const handler=(e)=>setIsMobile(e.matches)
    mql.addEventListener('change',handler)
    setIsMobile(mql.matches)
    return ()=>mql.removeEventListener('change',handler)
  },[query])
  return isMobile;
}

export default function   Projects(){
  const isMobile=useIsMobile()
  const sceneRef=useRef(null)


const projects = useMemo(
    () => [
      {
        title: "Resume Analyser",
        link: "https://resume-analyser-frontend-12uo.onrender.com",
        bgColor: "#0d4d3d",
        image: isMobile ? photo1 : img1, // use mobile or desktop image
      },
      {
        title: "Banking Ledger",
        link: "https://github.com/DHRUVSOHAL/Banking-ledger",
        bgColor: "#3884d3",
        image: isMobile ? img2 : img2,
      },
      {
        title: "Voting-Application",
        link: "",
        bgColor: "#dc9317",
        image: isMobile ? photo3 : img3,
      },
    ],
    [isMobile] // re-run only when `isMobile` changes
  );

  const { scrollYProgress } = useScroll({
  target: sceneRef,
  offset: ["start start", "end end"]
})

  const thresholds=projects.map((_,i)=>(i+1)/projects.length)
  const [activeIndex, setActiveIndex] = useState(0)

  useMotionValueEvent(scrollYProgress, "change", (v) => {
  const idx = thresholds.findIndex((t) => v <= t)
  setActiveIndex(idx === -1 ? thresholds.length - 1 : idx)
})

  const activeProject=projects[activeIndex]

  return(
    <section id="projects"
    ref={sceneRef}
    className="relative text-white"
    style={{
      height:`${100*projects.length}vh`,
      backgroundColor:activeProject.bgColor,
      transition:'background-color 400ms ease '
    }}
    >
      <div
      className="sticky top-0 h-screen flex flex-col items-center justify-center">
        <h2
        className={`text-3xl font-semibold z-10 text-center ${
          isMobile? "mt-4":"mt-8"
        }`}>
          Projects</h2>
          <div
           className={`relative w-full flex-1 flex items-center justify-center ${
            isMobile?"-mt-4":""
           }`}>
            {projects.map((project,idx)=>{
              <div key={project.title}
              className={'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${ activeIndex==idx?"opacity-100 z-20:opacity-0 z-0 sm:z-10"}'}
              style={{width:"85%",maxWidth:"1200px"}}
              >

              </div>
            })}
          </div>
      </div>
    </section>
  )
              }

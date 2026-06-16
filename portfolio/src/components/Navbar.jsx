import { useState,useRef,useEffect } from "react"
import OverlayMenu from "./OverlayMenu"
import Logo from "../assets/Logo.png"
import { CgMenu } from "react-icons/cg";
export default function Navbar(){

const [menuOpen,setMenuOpen] = useState(false)
const [visible, setvisible] = useState(true)
const [forceVisible,setForceVisible]=useState(false)

const lastScrollY=useRef(0)//store scroll
const timerId=useRef(null)

useEffect(()=>{
    const homeSection=document.querySelector('#home')
    const observer=new IntersectionObserver(
        ([entry])=>{
            if(entry.isIntersecting){
                setForceVisible(true)
                setvisible(true)
            }else{
                setForceVisible(false)
            }
        },{threshold:0.1})

    if(homeSection)observer.observe(homeSection)
    return()=>{
    if(homeSection)observer.unobserve(homeSection)
    }

},[])//ek baar chalane ke liye

useEffect(()=>{
    const handleScroll=()=>{
        if(forceVisible){
            setvisible(true)
            return
        }
        const currentScrollY=window.scrollY
        if(currentScrollY > lastScrollY.current){
            setvisible(false)//scrolling down
        }
        else{
            setvisible(true)
            if(timerId.current)clearTimeout(timerId.current)
                timerId.current=setTimeout(()=>{
                    setvisible(false)
                },3000)
        }
        lastScrollY.current=currentScrollY

    }
    window.addEventListener("scroll",handleScroll,{passive:true})
    return ()=>{
        window.removeEventListener("scroll",handleScroll);
        if(timerId.current)clearTimeout(timerId.current)
    }
},[forceVisible])







    return (
<>
<nav className = {`fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-50 transition-transform duration-300 ${visible?"translate-y-0":"translate-y-full"} `}>

    <div className="flex items-center space-x-2 ">
        <img src={Logo} alt="Logo" className="h-8 w-8"/>
        <div className="text-2xl font-bold text-white hidden sm:block ">
            DHRUV
        </div>
    </div>

    <div className="block lg:absolute lg:left-1/2 lg:transform-x-1/2">
    <button
    onClick={()=>setMenuOpen(true)}
    className="text-white text-3xl focus-outline-none"
    aria-label="open Menu"
    ><CgMenu />
    </button>
    </div>
    
    <div className="hidden lg:block" >
        <a href="#contact"
        className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-5 py-2 rounded-full font-medium shadow-lg hover:opacity-90 transition-opacity duration-300">
            Reach out
        </a>

    </div>

</nav>


<OverlayMenu isOpen={menuOpen} onClose={()=>setMenuOpen(false)}/>
</>

    )
}
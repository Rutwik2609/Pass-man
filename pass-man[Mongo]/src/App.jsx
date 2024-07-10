import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='overflow-x-hidden '>
        <Navbar/>
        <div className=" z-[-2]  w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] ">
        <Manager/>
        </div>
        <Footer/>
      </div>
    </>
  )
}

export default App

import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(){
  return (
    <nav className="nav">
      <div style={{display:'flex', alignItems:'center'}}>
        <Link to='/' style={{fontWeight:700, fontSize:18, color:'white'}}>Product Ordering</Link>
      </div>
      <div>
        <Link to='/'>Home</Link>
        <Link to='/about'>About</Link>
        <Link to='/contact'>Contact</Link>
      </div>
    </nav>
  )
}

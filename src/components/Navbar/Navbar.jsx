import React, { useState } from 'react'
import { Link } from 'react-router' // FIXED: should be 'react-router-dom'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="bg-gradient-to-r from-amber-300 to-amber-100 p-4 w-full shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* LOGO Name */}
        <div className="text-amber-800 text-2xl font-extrabold tracking-wide">
          <Link to="/">UnlokPass</Link>
        </div>

        {/* Mobile Toggle Button */}
        <div className="block lg:hidden">
          <button 
            className="text-amber-800 focus:outline-none"
            onClick={toggleMenu}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-6 text-amber-800 font-medium">
          <Link to="/" className="hover:text-amber-600 transition">Home</Link>
          <Link to="/vault-pass" className="block hover:text-amber-600">Vault</Link>
          <Link to="/service" className="hover:text-amber-600 transition">Services</Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'} mt-4`}>
        <ul className="space-y-2 text-amber-800 font-medium">
          <li><Link to="/" className="block hover:text-amber-600 py-2">Home</Link></li>
          <li><Link to="/vault-pass" className="block hover:text-amber-600 py-2">Vault</Link></li>
          <li><Link to="/service" className="block hover:text-amber-600 py-2">Services</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar

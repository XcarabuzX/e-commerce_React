import React, { useState } from 'react'
import { FaFire } from 'react-icons/fa'
import CartWidget from './CartWidget'

const NavBar = () => {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <a href="#" className="inline-flex items-center gap-2">
            <span className="text-2xl text-blue-500">
              <FaFire />
            </span>
            <span className="font-bold text-lg tracking-tight">ColdFlame Store</span>
          </a>

          <ul className="hidden md:flex items-center gap-6 font-medium">
            <li><a className="hover:text-sky-600 transition-colors" href="#">Inicio</a></li>
            <li><a className="hover:text-sky-600 transition-colors" href="#">Catálogo</a></li>
            <li><a className="hover:text-sky-600 transition-colors" href="#">Ofertas</a></li>
            <li><a className="hover:text-sky-600 transition-colors" href="#">Contacto</a></li>
            <li><CartWidget quantity={1} /></li>
          </ul>

          <button
            onClick={() => setOpen(v => !v)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-300 text-slate-700"
            aria-label="Abrir menú"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-3">
            <ul className="flex flex-col gap-2 font-medium">
              <li><a className="block px-2 py-2 rounded hover:bg-slate-100" href="#">Inicio</a></li>
              <li><a className="block px-2 py-2 rounded hover:bg-slate-100" href="#">Catálogo</a></li>
              <li><a className="block px-2 py-2 rounded hover:bg-slate-100" href="#">Ofertas</a></li>
              <li><a className="block px-2 py-2 rounded hover:bg-slate-100" href="#">Contacto</a></li>
              <li className="px-2 pt-2"><CartWidget quantity={0} /></li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  )
}

export default NavBar
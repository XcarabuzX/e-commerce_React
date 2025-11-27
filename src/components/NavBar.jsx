import React, { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FaFire } from 'react-icons/fa'
import CartWidget from './CartWidget'
import { getCategories } from '../utils/api'
import { useAuth } from '../context/AuthContext'
import AuthModal from './Auth/AuthModal'

const NavBar = () => {
  const [open, setOpen] = useState(false)
  const [categories, setCategories] = useState([])
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const { user, signOut } = useAuth()

  useEffect(() => {
    getCategories().then(setCategories)
  }, [])

  return (
    <>
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2">
            <span className="text-2xl text-blue-500">
              <FaFire />
            </span>
            <span className="font-bold text-lg tracking-tight">ColdFlame Store</span>
          </Link>

          <ul className="hidden md:flex items-center gap-6 font-medium">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `hover:text-sky-600 transition-colors ${
                    isActive ? 'text-sky-600 font-semibold' : 'text-slate-700'
                  }`
                }
                end
              >
                Inicio
              </NavLink>
            </li>
            {categories.map((category) => (
              <li key={category.id}>
                <NavLink
                  to={`/category/${category.id}`}
                  className={({ isActive }) =>
                    `hover:text-sky-600 transition-colors ${
                      isActive ? 'text-sky-600 font-semibold' : 'text-slate-700'
                    }`
                  }
                >
                  {category.name}
                </NavLink>
              </li>
            ))}
            <li><CartWidget /></li>
            {user ? (
              <li className="flex items-center gap-3">
                <span className="text-sm text-slate-600">
                  Hola, {user.displayName || user.email}
                </span>
                <button
                  onClick={signOut}
                  className="px-3 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-100"
                >
                  Salir
                </button>
              </li>
            ) : (
              <li>
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
                >
                  Iniciar Sesión
                </button>
              </li>
            )}
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
              <li>
                <NavLink
                  to="/"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block px-2 py-2 rounded hover:bg-slate-100 ${
                      isActive ? 'bg-slate-100 text-sky-600 font-semibold' : 'text-slate-700'
                    }`
                  }
                  end
                >
                  Inicio
                </NavLink>
              </li>
              {categories.map((category) => (
                <li key={category.id}>
                  <NavLink
                    to={`/category/${category.id}`}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block px-2 py-2 rounded hover:bg-slate-100 ${
                        isActive ? 'bg-slate-100 text-sky-600 font-semibold' : 'text-slate-700'
                      }`
                    }
                  >
                    {category.name}
                  </NavLink>
                </li>
              ))}
              <li className="px-2 pt-2"><CartWidget /></li>
              {user ? (
                <li className="px-2 pt-2">
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-slate-600">
                      Hola, {user.displayName || user.email}
                    </span>
                    <button
                      onClick={signOut}
                      className="px-3 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-100"
                    >
                      Salir
                    </button>
                  </div>
                </li>
              ) : (
                <li className="px-2 pt-2">
                  <button
                    onClick={() => setAuthModalOpen(true)}
                    className="w-full px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
                  >
                    Iniciar Sesión
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>
    </header>

    <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  )
}

export default NavBar

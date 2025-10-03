import React from 'react'
import NavBar from './components/NavBar'
import ItemListContainer from './components/ItemListContainer'

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">
        <ItemListContainer greeting="¡Bienvenido/a a ColdFlame Store! Descubre productos increíbles 🔥" />
      </main>
      <footer className="py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} ColdFlame Store — Todos los derechos reservados
      </footer>
    </div>
  )
}

export default App
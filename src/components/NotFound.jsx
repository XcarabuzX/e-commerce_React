import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm text-center">
        <div className="py-12">
          <h1 className="text-6xl font-bold text-slate-800 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-slate-700 mb-4">Página no encontrada</h2>
          <p className="text-slate-600 mb-8 max-w-md mx-auto">
            Lo sentimos, la página que estás buscando no existe o ha sido movida.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-sky-600 text-white font-semibold hover:bg-sky-700 transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  )
}

export default NotFound


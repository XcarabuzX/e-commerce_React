import React from 'react'
import { Link } from 'react-router-dom'

const ItemCard = ({ product }) => {
  return (
    <div className="rounded-xl border border-slate-200 p-4 bg-white hover:shadow-lg transition-shadow">
      <div className="aspect-video rounded-lg bg-slate-100 mb-4 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.title}</h3>
      <p className="text-sm text-slate-600 mb-3 line-clamp-2">{product.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold text-sky-600">${product.price.toFixed(2)}</span>
        <Link
          to={`/item/${product.id}`}
          className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-sky-600 text-white text-sm font-medium hover:bg-sky-700 transition-colors"
        >
          Ver más
        </Link>
      </div>
    </div>
  )
}

export default ItemCard


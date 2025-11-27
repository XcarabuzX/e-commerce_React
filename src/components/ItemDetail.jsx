import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getCategories } from '../utils/api'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import ItemCount from './ItemCount'

const ItemDetail = ({ product }) => {
  const [categories, setCategories] = useState([])
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()
  const { user } = useAuth()

  useEffect(() => {
    getCategories().then(setCategories)
  }, [])

  const handleAddToCart = (quantity) => {
    if (!user) {
      toast.warning('Debes iniciar sesión para agregar productos al carrito', {
        position: 'top-center'
      })
      return
    }

    addItem(product, quantity)
    setAdded(true)
    toast.success('¡Producto agregado al carrito!', {
      position: 'top-center'
    })
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-lg bg-slate-100 overflow-hidden">
          <img
            src={product.imageUrl || product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.title}</h1>
          <p className="text-2xl font-bold text-sky-600 mb-6">${product.price.toFixed(2)}</p>
          
          <div className="mb-6">
            <p className="text-slate-700 leading-relaxed">{product.description}</p>
          </div>

          <div className="mb-6">
            <p className="text-sm text-slate-600 mb-2">
              <span className="font-semibold">Categoría:</span>{' '}
              {categories.find(cat => cat.id === product.category)?.name || product.category}
            </p>
            <p className="text-sm text-slate-600 mb-2">
              <span className="font-semibold">Stock disponible:</span> {product.stock} unidades
            </p>
          </div>

          <div className="mb-4">
            {!added ? (
              <>
                <p className="text-sm font-medium mb-2">Cantidad:</p>
                <ItemCount
                  stock={product.stock}
                  initial={1}
                  onAdd={handleAddToCart}
                />
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  to="/carrito"
                  className="w-full py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 font-semibold text-center transition-colors"
                >
                  Ir al Carrito
                </Link>
                <button
                  onClick={() => setAdded(false)}
                  className="w-full py-3 border-2 border-sky-600 text-sky-600 rounded-lg hover:bg-sky-50 font-semibold transition-colors"
                >
                  Seguir Comprando
                </button>
              </div>
            )}
          </div>

          <Link
            to="/"
            className="mt-4 inline-flex items-center justify-center px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors text-center w-full"
          >
            ← Volver al catálogo
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ItemDetail


import React, { useState } from 'react'

const ItemCount = ({ stock, initial = 1, onAdd }) => {
  const [count, setCount] = useState(initial)

  const handleIncrement = () => {
    if (count < stock) {
      setCount(count + 1)
    }
  }

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1)
    }
  }

  const handleAddToCart = () => {
    if (onAdd) {
      onAdd(count)
    } else {
      alert(`Se agregaron ${count} unidades al carrito`)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <button
          onClick={handleDecrement}
          disabled={count <= 1}
          className="w-10 h-10 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          aria-label="Decrementar cantidad"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14" />
          </svg>
        </button>
        
        <span className="text-xl font-semibold min-w-[3rem] text-center">{count}</span>
        
        <button
          onClick={handleIncrement}
          disabled={count >= stock}
          className="w-10 h-10 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          aria-label="Incrementar cantidad"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5v14" />
          </svg>
        </button>
      </div>

      <button
        onClick={handleAddToCart}
        className="w-full px-6 py-3 rounded-lg bg-sky-600 text-white font-semibold hover:bg-sky-700 transition-colors"
      >
        Agregar al carrito
      </button>
    </div>
  )
}

export default ItemCount


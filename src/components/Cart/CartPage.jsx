import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'

const CartPage = () => {
  const { cart, removeItem, updateQuantity, getTotalPrice, loading } = useCart()
  const { user } = useAuth()

  if (!user) {
    return (
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Inicia sesión para ver tu carrito</h2>
          <p className="text-slate-600">Debes iniciar sesión para agregar productos al carrito.</p>
        </div>
      </section>
    )
  }

  if (loading) {
    return (
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
        </div>
      </section>
    )
  }

  if (cart.items.length === 0) {
    return (
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío</h2>
          <Link to="/" className="text-sky-600 hover:underline">
            Ir a comprar
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h1 className="text-2xl font-bold mb-6">Carrito de Compras</h1>

        <div className="space-y-4">
          {cart.items.map((item) => (
            <div key={item.productId} className="flex gap-4 border-b pb-4">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-24 h-24 object-cover rounded"
              />

              <div className="flex-1">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-slate-600">${item.price.toFixed(2)}</p>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    className="px-2 py-1 border rounded hover:bg-slate-100"
                  >
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className="px-2 py-1 border rounded hover:bg-slate-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeItem(item.productId)}
                  className="text-red-600 hover:underline text-sm mt-2"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-bold">Total:</span>
            <span className="text-2xl font-bold text-sky-600">
              ${getTotalPrice().toFixed(2)}
            </span>
          </div>

          <button className="w-full py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 font-semibold">
            Proceder al Pago
          </button>
        </div>
      </div>
    </section>
  )
}

export default CartPage

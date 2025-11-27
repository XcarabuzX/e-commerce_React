import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getOrderById } from '../../utils/orders'

const OrderConfirmation = () => {
  const { orderId } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const orderData = await getOrderById(orderId)
        setOrder(orderData)
      } catch (err) {
        setError('No se pudo cargar la orden')
      } finally {
        setLoading(false)
      }
    }

    loadOrder()
  }, [orderId])

  if (loading) {
    return (
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
        </div>
      </section>
    )
  }

  if (error || !order) {
    return (
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Error</h2>
          <p className="text-slate-600 mb-6">{error || 'Orden no encontrada'}</p>
          <Link
            to="/"
            className="inline-block px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
          >
            Volver al inicio
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        {/* Encabezado de confirmación */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-green-600 mb-2">
            ¡Compra Confirmada!
          </h1>
          <p className="text-slate-600">
            Tu orden ha sido procesada exitosamente
          </p>
        </div>

        {/* ID de Orden */}
        <div className="bg-slate-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-slate-600 mb-1">ID de Orden:</p>
          <p className="text-2xl font-mono font-bold text-slate-900">
            {order.id}
          </p>
        </div>

        {/* Información del comprador */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Datos de Contacto</h2>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">Nombre:</span> {order.buyer.name}
            </p>
            <p>
              <span className="font-medium">Email:</span> {order.buyer.email}
            </p>
            <p>
              <span className="font-medium">Teléfono:</span> {order.buyer.phone}
            </p>
          </div>
        </div>

        {/* Productos */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Productos</h2>
          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b pb-3"
              >
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-slate-600">
                    Cantidad: {item.quantity}
                  </p>
                </div>
                <p className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="border-t pt-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">Total:</span>
            <span className="text-2xl font-bold text-sky-600">
              ${order.total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Mensaje adicional */}
        <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-sky-900">
            📧 Recibirás un email de confirmación en {order.buyer.email} con los
            detalles de tu orden.
          </p>
        </div>

        {/* Botones */}
        <div className="flex gap-3">
          <Link
            to="/"
            className="flex-1 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 font-semibold text-center"
          >
            Seguir Comprando
          </Link>
          <button
            onClick={() => window.print()}
            className="px-6 py-3 border-2 border-sky-600 text-sky-600 rounded-lg hover:bg-sky-50 font-semibold"
          >
            Imprimir
          </button>
        </div>
      </div>
    </section>
  )
}

export default OrderConfirmation

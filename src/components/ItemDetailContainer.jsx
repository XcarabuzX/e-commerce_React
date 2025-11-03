import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../utils/api'
import ItemDetail from './ItemDetail'

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    setLoading(true)
    
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(id)
        setProduct(productData)
      } catch (error) {
        console.error('Error al cargar el producto:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600 mb-4"></div>
              <p className="text-slate-600">Cargando producto...</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!product) {
    return (
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm text-center">
          <h2 className="text-2xl font-bold mb-4">Producto no encontrado</h2>
          <p className="text-slate-600 mb-6">El producto que buscas no existe.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <ItemDetail product={product} />
    </section>
  )
}

export default ItemDetailContainer


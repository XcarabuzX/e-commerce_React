import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProducts, getProductsByCategory, getCategories } from '../utils/api'
import ItemList from './ItemList'

const ItemListContainer = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const { categoryId } = useParams()

  useEffect(() => {
    getCategories().then(setCategories)
  }, [])

  useEffect(() => {
    setLoading(true)

    const fetchProducts = async () => {
      try {
        let productsData
        if (categoryId) {
          productsData = await getProductsByCategory(categoryId)
        } else {
          productsData = await getProducts()
        }
        setProducts(productsData)
      } catch (error) {
        console.error('Error al cargar productos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [categoryId])

  if (loading) {
    return (
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600 mb-4"></div>
              <p className="text-slate-600">Cargando productos...</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
          {categoryId 
            ? `Categoría: ${categories.find(cat => cat.id === categoryId)?.name || categoryId}`
            : 'Catálogo de Productos'}
        </h1>
        {products.length > 0 ? (
          <ItemList products={products} />
        ) : (
          <p className="text-slate-600 text-center py-8">
            No se encontraron productos en esta categoría.
          </p>
        )}
      </div>
    </section>
  )
}

export default ItemListContainer

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProducts, deleteProduct, getCategories } from '../../utils/api'

const AdminPanel = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadData = async () => {
    setLoading(true)
    try {
      const [productsData, categoriesData] = await Promise.all([
        getProducts(),
        getCategories()
      ])
      setProducts(productsData)
      setCategories(categoriesData)
    } catch (err) {
      setError('Error al cargar los productos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleDelete = async (productId, productTitle) => {
    if (!window.confirm(`¿Estás seguro de eliminar "${productTitle}"?`)) {
      return
    }

    try {
      await deleteProduct(productId)
      setProducts(products.filter(p => p.id !== productId))
      alert('Producto eliminado exitosamente')
    } catch (err) {
      alert('Error al eliminar el producto')
    }
  }

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId)
    return category?.name || categoryId
  }

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded">
          {error}
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Panel de Administración</h1>
            <p className="text-slate-600 text-sm mt-1">
              Gestiona el catálogo de productos
            </p>
          </div>
          <Link
            to="/admin/nuevo"
            className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 font-semibold"
          >
            + Nuevo Producto
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600 mb-4">No hay productos en el catálogo</p>
            <Link
              to="/admin/nuevo"
              className="inline-block px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
            >
              Crear el primer producto
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold text-sm">Imagen</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Producto</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Categoría</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Precio</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Stock</th>
                  <th className="text-right py-3 px-4 font-semibold text-sm">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4">
                      <img
                        src={product.imageUrl || product.image}
                        alt={product.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium">{product.title}</div>
                      <div className="text-sm text-slate-600 line-clamp-1">
                        {product.description}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {getCategoryName(product.category)}
                    </td>
                    <td className="py-3 px-4 font-semibold text-sky-600">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        product.stock > 10
                          ? 'bg-green-100 text-green-700'
                          : product.stock > 0
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {product.stock} unidades
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/admin/editar/${product.id}`}
                          className="px-3 py-1 text-sm border border-slate-300 rounded hover:bg-slate-100"
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id, product.title)}
                          className="px-3 py-1 text-sm border border-red-300 text-red-600 rounded hover:bg-red-50"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-6 text-center">
        <Link
          to="/"
          className="text-sky-600 hover:underline"
        >
          ← Volver a la tienda
        </Link>
      </div>
    </section>
  )
}

export default AdminPanel

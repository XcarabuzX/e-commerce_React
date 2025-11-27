import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getCategories, createProduct, updateProduct } from '../../utils/api'

const ProductForm = ({ product = null, onSuccess }) => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    title: product?.title || '',
    description: product?.description || '',
    price: product?.price || '',
    stock: product?.stock || '',
    category: product?.category || '',
    imageUrl: product?.imageUrl || product?.image || ''
  })

  useEffect(() => {
    getCategories().then(setCategories)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validaciones
    if (!formData.title || !formData.description || !formData.price || !formData.stock || !formData.category || !formData.imageUrl) {
      setError('Todos los campos son requeridos')
      setLoading(false)
      return
    }

    if (formData.price <= 0) {
      setError('El precio debe ser mayor a 0')
      setLoading(false)
      return
    }

    if (formData.stock < 0) {
      setError('El stock no puede ser negativo')
      setLoading(false)
      return
    }

    try {
      if (product) {
        // Modo edición
        await updateProduct(product.id, formData)
        toast.success('Producto actualizado exitosamente')
      } else {
        // Modo creación
        await createProduct(formData)
        toast.success('Producto creado exitosamente')
      }

      if (onSuccess) {
        onSuccess()
      } else {
        navigate('/admin')
      }
    } catch (err) {
      setError(err.message || 'Error al guardar el producto')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6">
      <h2 className="text-2xl font-bold mb-6">
        {product ? 'Editar Producto' : 'Crear Nuevo Producto'}
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Título</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Precio ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0.01"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Categoría</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600"
            required
          >
            <option value="">Selecciona una categoría</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">URL de Imagen</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600"
            required
          />
          <p className="text-xs text-slate-500 mt-1">
            Puedes usar imágenes de Unsplash u otro servicio de imágenes
          </p>
        </div>

        {formData.imageUrl && (
          <div>
            <label className="block text-sm font-medium mb-2">Vista previa:</label>
            <img
              src={formData.imageUrl}
              alt="Preview"
              className="w-full max-w-xs h-48 object-cover rounded-lg border border-slate-200"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          </div>
        )}
      </div>

      <div className="flex gap-3 mt-6">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 disabled:opacity-50 font-semibold"
        >
          {loading ? 'Guardando...' : product ? 'Actualizar Producto' : 'Crear Producto'}
        </button>
        <button
          type="button"
          onClick={() => navigate('/admin')}
          className="px-6 py-2 border border-slate-300 rounded-lg hover:bg-slate-100"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}

export default ProductForm

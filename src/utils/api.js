// Utilidades para simular llamadas API asincrónicas
import { products } from '../data/products'

/**
 * Simula una llamada API para obtener todos los productos
 * @returns {Promise<Array>} Lista de productos
 */
export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products)
    }, 1000)
  })
}

/**
 * Simula una llamada API para obtener productos por categoría
 * @param {string} categoryId - ID de la categoría
 * @returns {Promise<Array>} Lista de productos filtrados
 */
export const getProductsByCategory = (categoryId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredProducts = products.filter(
        product => product.category === categoryId
      )
      resolve(filteredProducts)
    }, 1000)
  })
}

/**
 * Simula una llamada API para obtener un producto por ID
 * @param {number} id - ID del producto
 * @returns {Promise<Object|null>} Producto encontrado o null
 */
export const getProductById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = products.find(p => p.id === parseInt(id))
      resolve(product || null)
    }, 1000)
  })
}


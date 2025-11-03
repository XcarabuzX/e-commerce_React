import { products } from '../data/products'

export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products)
    }, 1000)
  })
}

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

export const getProductById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = products.find(p => p.id === parseInt(id))
      resolve(product || null)
    }, 1000)
  })
}


import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  orderBy
} from 'firebase/firestore'
import { db } from '../config/firebase'

// Cache para categorías (se cargan una vez)
let categoriesCache = null

export const getProducts = async () => {
  try {
    const productsRef = collection(db, 'products')
    const q = query(productsRef, orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)

    return snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }))
  } catch (error) {
    console.error('Error fetching products:', error)
    throw new Error('No se pudieron cargar los productos')
  }
}

export const getProductsByCategory = async (categoryId) => {
  try {
    const productsRef = collection(db, 'products')
    const q = query(
      productsRef,
      where('category', '==', categoryId),
      orderBy('createdAt', 'desc')
    )
    const snapshot = await getDocs(q)

    return snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }))
  } catch (error) {
    console.error('Error fetching products by category:', error)
    throw new Error('No se pudieron cargar los productos de esta categoría')
  }
}

export const getProductById = async (id) => {
  try {
    const productRef = doc(db, 'products', String(id))
    const snapshot = await getDoc(productRef)

    if (!snapshot.exists()) {
      return null
    }

    return {
      ...snapshot.data(),
      id: snapshot.id
    }
  } catch (error) {
    console.error('Error fetching product:', error)
    throw new Error('No se pudo cargar el producto')
  }
}

export const getCategories = async () => {
  if (categoriesCache) {
    return categoriesCache
  }

  try {
    const categoriesRef = collection(db, 'categories')
    const snapshot = await getDocs(categoriesRef)

    categoriesCache = snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }))

    return categoriesCache
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw new Error('No se pudieron cargar las categorías')
  }
}

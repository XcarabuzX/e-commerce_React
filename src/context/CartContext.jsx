import { createContext, useContext, useState, useEffect } from 'react'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import { useAuth } from './AuthContext'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] })
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  // Cargar carrito cuando el usuario inicia sesión
  useEffect(() => {
    if (!user) {
      setCart({ items: [] })
      return
    }

    const loadCart = async () => {
      setLoading(true)
      try {
        const cartRef = doc(db, 'carts', user.uid)
        const cartDoc = await getDoc(cartRef)

        if (cartDoc.exists()) {
          setCart(cartDoc.data())
        } else {
          const newCart = { items: [], createdAt: new Date(), updatedAt: new Date() }
          await setDoc(cartRef, newCart)
          setCart(newCart)
        }
      } catch (error) {
        console.error('Error loading cart:', error)
      } finally {
        setLoading(false)
      }
    }

    loadCart()
  }, [user])

  const saveCart = async (newCart) => {
    if (!user) return

    try {
      const cartRef = doc(db, 'carts', user.uid)
      await updateDoc(cartRef, {
        ...newCart,
        updatedAt: new Date()
      })
    } catch (error) {
      console.error('Error saving cart:', error)
    }
  }

  const addItem = async (product, quantity) => {
    const existingItem = cart.items.find(item => item.productId === product.id)

    let newCart
    if (existingItem) {
      newCart = {
        ...cart,
        items: cart.items.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
    } else {
      newCart = {
        ...cart,
        items: [
          ...cart.items,
          {
            productId: product.id,
            title: product.title,
            price: product.price,
            quantity,
            imageUrl: product.imageUrl || product.image
          }
        ]
      }
    }

    setCart(newCart)
    await saveCart(newCart)
  }

  const removeItem = async (productId) => {
    const newCart = {
      ...cart,
      items: cart.items.filter(item => item.productId !== productId)
    }
    setCart(newCart)
    await saveCart(newCart)
  }

  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) {
      await removeItem(productId)
      return
    }

    const newCart = {
      ...cart,
      items: cart.items.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      )
    }
    setCart(newCart)
    await saveCart(newCart)
  }

  const clearCart = async () => {
    const newCart = { items: [] }
    setCart(newCart)
    await saveCart(newCart)
  }

  const getTotalQuantity = () => {
    return cart.items.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cart.items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const value = {
    cart,
    loading,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalQuantity,
    getTotalPrice
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

import { collection, addDoc, doc, getDoc, Timestamp } from 'firebase/firestore'
import { db } from '../config/firebase'

export const createOrder = async (orderData, userId) => {
  try {
    const ordersRef = collection(db, 'orders')

    const order = {
      buyerId: userId,
      buyer: {
        name: orderData.name,
        phone: orderData.phone,
        email: orderData.email
      },
      items: orderData.items.map(item => ({
        id: item.productId,
        title: item.title,
        price: item.price,
        quantity: item.quantity
      })),
      total: orderData.total,
      date: Timestamp.now(),
      status: 'generated'
    }

    const docRef = await addDoc(ordersRef, order)

    return {
      id: docRef.id,
      ...order
    }
  } catch (error) {
    console.error('Error creating order:', error)
    throw new Error('No se pudo crear la orden')
  }
}

export const getOrderById = async (orderId) => {
  try {
    const orderRef = doc(db, 'orders', orderId)
    const orderDoc = await getDoc(orderRef)

    if (!orderDoc.exists()) {
      throw new Error('Orden no encontrada')
    }

    return {
      id: orderDoc.id,
      ...orderDoc.data()
    }
  } catch (error) {
    console.error('Error fetching order:', error)
    throw new Error('No se pudo cargar la orden')
  }
}

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
  
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const products = [
  {
    id: 1,
    title: "Smartphone Pro Max",
    price: 899.99,
    description: "El smartphone más avanzado con pantalla de 6.7 pulgadas, cámara de 108MP y procesador de última generación. Perfecto para fotografía y gaming.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop",
    stock: 15
  },
  {
    id: 2,
    title: "Laptop Ultrabook",
    price: 1299.99,
    description: "Laptop ultraliviana con procesador Intel i7, 16GB RAM y SSD de 512GB. Ideal para profesionales y estudiantes.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop",
    stock: 8
  },
  {
    id: 3,
    title: "Auriculares Inalámbricos",
    price: 199.99,
    description: "Auriculares con cancelación de ruido activa, batería de 30 horas y calidad de sonido Hi-Fi.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    stock: 25
  },
  {
    id: 4,
    title: "Camiseta Básica Premium",
    price: 29.99,
    description: "Camiseta de algodón 100% orgánico, suave y cómoda. Disponible en múltiples colores.",
    category: "clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
    stock: 50
  },
  {
    id: 5,
    title: "Jeans Clásicos",
    price: 79.99,
    description: "Jeans de corte clásico, resistentes y cómodos. Hechos con algodón reciclado.",
    category: "clothing",
    image: "https://images.unsplash.com/photo-1542272604-787c12538374?w=500&h=500&fit=crop",
    stock: 30
  },
  {
    id: 6,
    title: "Zapatillas Running",
    price: 129.99,
    description: "Zapatillas deportivas con tecnología de amortiguación avanzada. Perfectas para correr y entrenar.",
    category: "clothing",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
    stock: 20
  },
  {
    id: 7,
    title: "Mesa de Escritorio Moderna",
    price: 349.99,
    description: "Mesa de escritorio minimalista con estructura de metal y superficie de madera maciza.",
    category: "furniture",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop",
    stock: 12
  },
  {
    id: 8,
    title: "Silla Ergonómica",
    price: 299.99,
    description: "Silla ergonómica con soporte lumbar ajustable, ideal para largas horas de trabajo.",
    category: "furniture",
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&h=500&fit=crop",
    stock: 10
  },
  {
    id: 9,
    title: "Lámpara de Pie LED",
    price: 89.99,
    description: "Lámpara de pie moderna con luz LED ajustable y control de temperatura de color.",
    category: "furniture",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop",
    stock: 18
  }
]

const categories = [
  { id: "electronics", name: "Electrónica" },
  { id: "clothing", name: "Ropa" },
  { id: "furniture", name: "Muebles" }
]

async function migrateData() {
  console.log('🚀 Iniciando migración...')

  // Migrar categorías
  for (const category of categories) {
    await setDoc(doc(db, 'categories', category.id), {
      id: category.id,
      name: category.name
    })
    console.log(`✅ Categoría migrada: ${category.name}`)
  }

  // Migrar productos (manteniendo URLs de Unsplash temporalmente)
  for (const product of products) {
    await setDoc(doc(db, 'products', String(product.id)), {
      id: String(product.id),
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      imageUrl: product.image, // Por ahora mantener Unsplash
      stock: product.stock,
      createdAt: new Date()
    })
    console.log(`✅ Producto migrado: ${product.title}`)
  }

  console.log('🎉 Migración completada!')
  process.exit(0)
}

migrateData().catch(console.error)

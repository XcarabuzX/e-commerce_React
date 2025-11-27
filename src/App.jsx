import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NavBar from './components/NavBar'
import ItemListContainer from './components/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer'
import CartPage from './components/Cart/CartPage'
import NotFound from './components/NotFound'
import AdminRoute from './components/Admin/AdminRoute'
import AdminPanel from './components/Admin/AdminPanel'
import CreateProductPage from './components/Admin/CreateProductPage'
import EditProductPage from './components/Admin/EditProductPage'

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/category/:categoryId" element={<ItemListContainer />} />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          <Route path="/carrito" element={<CartPage />} />

          {/* Rutas protegidas de administración */}
          <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
          <Route path="/admin/nuevo" element={<AdminRoute><CreateProductPage /></AdminRoute>} />
          <Route path="/admin/editar/:id" element={<AdminRoute><EditProductPage /></AdminRoute>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} ColdFlame Store — Todos los derechos reservados
      </footer>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default App

# 🛍️ E-commerce React (Entrega 1)

Este proyecto corresponde a la **primera entrega** de la clase de React.  
Se construyen los **primeros componentes base** para un e-commerce utilizando **Vite + React + TailwindCSS**.

## 🚀 Tecnologías utilizadas
- [React](https://react.dev/) con Vite
- [TailwindCSS](https://tailwindcss.com/) para estilos rápidos y responsivos
- JavaScript ES6+

## 📂 Estructura de componentes
- **NavBar.jsx** → Barra de navegación con logo, enlaces y el widget de carrito.
- **CartWidget.jsx** → Componente del carrito, renderizado dentro de `NavBar`.
- **ItemListContainer.jsx** → Contenedor que recibe una **prop** `greeting` para mostrar un mensaje de bienvenida.

## 🎯 Navegación con React Router

### Rutas implementadas
→ Catálogo completo de productos
→ Catálogo filtrado por categoría (electronics, clothing, furniture)
→ Detalle de un producto individual
→ Vista 404 para rutas no encontradas

## 🎨 Características
- ✅ Separación clara entre componentes contenedores y de presentación
- ✅ Navegación completa con React Router
- ✅ Rutas dinámicas usando `useParams()`
- ✅ Estados de carga durante las peticiones async
- ✅ Diseño responsive con Tailwind CSS
- ✅ NavBar visible en todas las rutas

## ▶️ Cómo correr el proyecto
```bash
# Instalar dependencias
npm install

# Ejecutar en entorno de desarrollo
npm run dev
```
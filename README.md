# 🛍️ ColdFlame Store - E-commerce con React + Firebase

Proyecto final del curso de React de CoderHouse. E-commerce completo con autenticación, carrito persistente, checkout y panel de administración.

## 🎯 Descripción del Proyecto

ColdFlame Store es una Single Page Application (SPA) de e-commerce desarrollada con React que permite a los usuarios navegar productos, agregarlos al carrito, realizar compras y gestionar el catálogo (admin). Los datos se almacenan en Firestore y la autenticación se maneja con Firebase Authentication.

## 🚀 Tecnologías Utilizadas

- **React 19** - Biblioteca de UI con hooks y componentes funcionales
- **Vite 7** - Build tool y dev server ultrarrápido
- **Firebase** - Backend as a Service
  - Firestore Database - Base de datos NoSQL
  - Firebase Authentication - Autenticación de usuarios
- **React Router v7** - Navegación SPA
- **TailwindCSS v4** - Framework de estilos utility-first
- **React Toastify** - Sistema de notificaciones
- **React Compiler** - Optimización automática de componentes

## ✨ Características Principales

### 🔐 Autenticación
- Registro de usuarios con email/password
- Login con Google OAuth
- Login con email/password
- Persistencia de sesión
- Gestión de roles (customer/admin)

### 🛒 Carrito de Compras
- Agregar/eliminar productos
- Actualizar cantidades
- Persistencia en Firestore por usuario
- Cálculo automático de totales
- Badge con cantidad total en NavBar

### 📦 Catálogo de Productos
- Vista de todos los productos
- Filtrado por categorías
- Vista de detalle de producto
- Stock en tiempo real
- Componente ItemCount para seleccionar cantidad

### 💳 Proceso de Checkout
- Formulario de datos de contacto
- Validaciones de campos
- Generación de orden en Firestore
- Página de confirmación con ID único
- Opción de imprimir recibo

### 👑 Panel de Administración
- CRUD completo de productos
- Protección de rutas (solo admin)
- Gestión de stock e inventario
- Subida de imágenes por URL
- Vista previa de productos

### 🎨 Interfaz de Usuario
- Diseño responsive (mobile-first)
- Notificaciones toast elegantes
- Estados de carga (loaders)
- Mensajes de error amigables
- Animaciones suaves

## 📂 Estructura del Proyecto

```
src/
├── components/
│   ├── Admin/
│   │   ├── AdminPanel.jsx        # Lista de productos (admin)
│   │   ├── AdminRoute.jsx        # HOC para proteger rutas
│   │   ├── ProductForm.jsx       # Formulario crear/editar producto
│   │   ├── CreateProductPage.jsx # Página crear producto
│   │   └── EditProductPage.jsx   # Página editar producto
│   ├── Auth/
│   │   ├── AuthModal.jsx         # Modal de autenticación
│   │   ├── LoginForm.jsx         # Formulario de login
│   │   └── SignupForm.jsx        # Formulario de registro
│   ├── Cart/
│   │   └── CartPage.jsx          # Página del carrito
│   ├── Checkout/
│   │   ├── CheckoutForm.jsx      # Formulario de checkout
│   │   └── OrderConfirmation.jsx # Confirmación de orden
│   ├── ItemCard.jsx              # Card de producto
│   ├── ItemCount.jsx             # Selector de cantidad
│   ├── ItemDetail.jsx            # Detalle de producto
│   ├── ItemDetailContainer.jsx   # Contenedor detalle
│   ├── ItemList.jsx              # Lista de productos
│   ├── ItemListContainer.jsx     # Contenedor lista
│   ├── NavBar.jsx                # Barra de navegación
│   ├── CartWidget.jsx            # Widget del carrito
│   └── NotFound.jsx              # Página 404
├── context/
│   ├── AuthContext.jsx           # Context de autenticación
│   └── CartContext.jsx           # Context del carrito
├── config/
│   └── firebase.js               # Configuración de Firebase
├── utils/
│   ├── api.js                    # Funciones de Firestore
│   └── orders.js                 # Funciones de órdenes
├── data/
│   └── products.js               # Datos originales (migrados a Firestore)
├── App.jsx                       # Componente principal
└── main.jsx                      # Entry point

```

## 🗂️ Estructura de Firestore

### Colección: `products`
```javascript
{
  id: "1",
  title: "Producto",
  description: "Descripción del producto",
  price: 99.99,
  stock: 10,
  category: "categoryId",
  imageUrl: "https://...",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Colección: `categories`
```javascript
{
  id: "electronics",
  name: "Electrónica",
  slug: "electronics"
}
```

### Colección: `users`
```javascript
{
  id: "uid",
  email: "user@example.com",
  displayName: "Usuario",
  role: "customer", // o "admin"
  createdAt: Timestamp
}
```

### Colección: `carts`
```javascript
{
  id: "userId",
  items: [
    {
      productId: "1",
      title: "Producto",
      price: 99.99,
      quantity: 2,
      imageUrl: "https://..."
    }
  ],
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Colección: `orders`
```javascript
{
  id: "orderId",
  buyerId: "userId",
  buyer: {
    name: "Juan Pérez",
    email: "juan@example.com",
    phone: "1234567890"
  },
  items: [...],
  total: 199.98,
  date: Timestamp,
  status: "generated"
}
```

## 🛣️ Rutas de la Aplicación

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | ItemListContainer | Catálogo completo |
| `/category/:categoryId` | ItemListContainer | Productos por categoría |
| `/item/:id` | ItemDetailContainer | Detalle del producto |
| `/carrito` | CartPage | Carrito de compras |
| `/orden/:orderId` | OrderConfirmation | Confirmación de orden |
| `/admin` | AdminPanel | Panel de administración * |
| `/admin/nuevo` | CreateProductPage | Crear producto * |
| `/admin/editar/:id` | EditProductPage | Editar producto * |

\* Rutas protegidas que requieren rol de administrador

## ⚙️ Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd e-commerce
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar Firebase

Crea un archivo `.env` en la raíz del proyecto con tus credenciales de Firebase:

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

**Nota:** Asegúrate de agregar `.env` a tu `.gitignore` para no exponer las credenciales.

### 4. Migrar datos a Firestore (opcional)

Si es la primera vez que inicias el proyecto:

```bash
node scripts/migrateToFirestore.js
```

### 5. Ejecutar en desarrollo
```bash
npm run dev
```

El proyecto se abrirá en `http://localhost:5173`

### 6. Build para producción
```bash
npm run build
npm run preview
```

## 🔒 Reglas de Seguridad de Firestore

Las reglas de seguridad implementadas garantizan:

- ✅ Productos y categorías: lectura pública, escritura solo admin
- ✅ Carritos: cada usuario solo puede leer/modificar su propio carrito
- ✅ Usuarios: no pueden cambiar su propio rol
- ✅ Órdenes: solo usuarios autenticados pueden crear, solo admin puede modificar

## 👤 Roles de Usuario

### Customer (Cliente)
- Navegar productos
- Agregar al carrito
- Realizar compras
- Ver sus propias órdenes

### Admin (Administrador)
- Todas las funciones de customer
- Acceso al panel de administración
- CRUD completo de productos
- Ver todas las órdenes

**Para promover un usuario a admin:**
1. Ve a Firebase Console → Firestore Database
2. Busca el documento del usuario en la colección `users`
3. Cambia el campo `role` de `"customer"` a `"admin"`

## 📝 Patrones y Buenas Prácticas

### Container/Presentational Pattern
- **Containers** (`ItemListContainer`, `ItemDetailContainer`): Manejan lógica y estado
- **Presentational** (`ItemList`, `ItemDetail`, `ItemCard`): Solo UI pura

### Context API
- `AuthContext`: Estado global de autenticación
- `CartContext`: Estado global del carrito (persistente en Firestore)

### Custom Hooks
- `useAuth()`: Acceso al contexto de autenticación
- `useCart()`: Acceso al contexto del carrito

### Componentes Reutilizables
- `ItemCount`: Selector de cantidad con validación de stock
- `AdminRoute`: HOC para proteger rutas de admin

## 🧪 Testing del Proyecto

### Flujo de Usuario Regular
1. Registrarse/Iniciar sesión
2. Navegar el catálogo
3. Ver detalle de producto
4. Agregar productos al carrito (ItemCount)
5. Ver carrito
6. Completar checkout
7. Ver confirmación de orden con ID

### Flujo de Administrador
1. Iniciar sesión como admin
2. Acceder al panel admin
3. Crear nuevo producto
4. Editar producto existente
5. Eliminar producto
6. Ver cambios reflejados en la tienda

## 🐛 Troubleshooting

### Productos no cargan
- Verifica que Firestore esté habilitado en Firebase Console
- Revisa las reglas de seguridad de Firestore
- Comprueba la conexión en Network tab de DevTools

### Error de permisos al crear orden
- Verifica que las reglas de Firestore incluyan la colección `orders`
- Asegúrate de estar autenticado

### El carrito no persiste
- Revisa que el usuario esté autenticado
- Verifica las reglas de la colección `carts`

### Tildes y caracteres especiales no se ven
- Los archivos deben estar en codificación UTF-8
- Verifica que tu editor guarde en UTF-8

## 📄 Licencia

Este proyecto fue desarrollado como proyecto final del curso de React de CoderHouse.

## 👨‍💻 Autor

Desarrollado por **Felipe Gutiérrez** como parte del curso de React en CoderHouse.

---

⭐ Si te gustó el proyecto, no olvides darle una estrella!

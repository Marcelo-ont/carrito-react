# Carrito de compras

Carrito de compras en React + Vite con Tailwind CSS 4. El estado se maneja
con Context API y se conserva entre recargas con `localStorage`.

**Demo:** https://carrito-mo-2026.web.app

## Características

- Catálogo de productos con precio, descripción y stock disponible
- Agregar al carrito con descuento automático del inventario
- Control de cantidades (+ / −) dentro del carrito, limitado por el stock
- Subtotal por producto y total general con formato de moneda (MXN)
- Contador de artículos en la barra de navegación
- Botones para quitar un producto completo o vaciar el carrito, devolviendo el stock
- El carrito sobrevive al recargar la página
- Botón "Add item" que agrega un producto nuevo al inventario

## Requisitos

- Node.js 18 o superior

## Desarrollo

```bash
npm install
npm run dev
```

## Build de producción

```bash
npm run build
npm run preview
```

## Despliegue

Se publica en Firebase Hosting (proyecto `carrito-mo-2026`):

```bash
npm run build
firebase deploy --only hosting
```

## Estructura

```
src/
├── App.jsx                 # envuelve la app con CartProvider
├── main.jsx
├── formato.js              # formato de moneda
├── index.css
├── context/
│   ├── CartContext.jsx     # el contexto
│   ├── CartProvider.jsx    # estado del inventario y el carrito
│   └── useCart.js          # hook para consumir el contexto
└── components/
    ├── Navbar.jsx          # navegación + contador
    ├── Catcar.jsx          # layout
    ├── Catalog.jsx         # listado de productos
    ├── Carrito.jsx         # carrito, cantidades y total
    └── Additem.jsx         # agrega un producto al inventario
```

## Cómo funciona el estado

`CartProvider` guarda un solo objeto con `inventario` y `carrito`. Cada acción
mueve unidades entre los dos: agregar al carrito descuenta del inventario y
quitar lo devuelve, así el stock siempre cuadra. Los totales se calculan con
`useMemo` a partir del carrito, y un `useEffect` guarda el estado en
`localStorage` en cada cambio.

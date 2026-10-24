import { useCallback, useEffect, useMemo, useState } from "react";
import { CartContext } from "./CartContext";

const INVENTARIO_INICIAL = [
    { name: "Cámara", id: 1, quantity: 3, price: 8999, description: "Cámara de última generación", image: "/products/camera.jpg" },
    { name: "Tripié", id: 2, quantity: 5, price: 1250, description: "Tripié para cámara profesional", image: "/products/tripod.jpg" },
    { name: "Lente", id: 3, quantity: 7, price: 4500, description: "Lente de alta resolución", image: "/products/lens.jpg" },
    { name: "Micrófono", id: 4, quantity: 2, price: 2100, description: "Micrófono inalámbrico", image: "/products/microphone.jpg" }
]

const STORAGE_KEY = "carrito-estado"

const leerEstadoGuardado = () => {
    try {
        const guardado = localStorage.getItem(STORAGE_KEY)
        if (!guardado) return null

        const estado = JSON.parse(guardado)
        if (!Array.isArray(estado?.inventario) || !Array.isArray(estado?.carrito)) return null

        return estado
    } catch {
        return null
    }
}

export const CartProvider = ({ children }) => {
    const [estado, setEstado] = useState(
        () => leerEstadoGuardado() ?? { inventario: INVENTARIO_INICIAL, carrito: [] }
    )

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(estado))
        } catch {
            // si el navegador bloquea el almacenamiento, el carrito sigue funcionando en memoria
        }
    }, [estado])

    const agregarAlCarrito = useCallback((producto) => {
        setEstado((estadoActual) => {
            const productoInventario = estadoActual.inventario.find((item) => item.id === producto.id)
            if (!productoInventario || productoInventario.quantity === 0) return estadoActual

            const productoCarrito = estadoActual.carrito.find((item) => item.id === producto.id)
            const carrito = productoCarrito
                ? estadoActual.carrito.map((item) => item.id === producto.id
                    ? { ...item, cantidadCarrito: item.cantidadCarrito + 1 }
                    : item
                )
                : [...estadoActual.carrito, {
                    id: productoInventario.id,
                    name: productoInventario.name,
                    price: productoInventario.price,
                    description: productoInventario.description,
                    image: productoInventario.image,
                    cantidadCarrito: 1
                }]

            return {
                inventario: estadoActual.inventario.map((item) => item.id === producto.id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
                ),
                carrito
            }
        })
    }, [])

    const quitarProducto = useCallback((id) => {
        setEstado((estadoActual) => {
            const producto = estadoActual.carrito.find((item) => item.id === id)
            if (!producto) return estadoActual

            return {
                inventario: estadoActual.inventario.map((item) => item.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                ),
                carrito: producto.cantidadCarrito === 1
                    ? estadoActual.carrito.filter((item) => item.id !== id)
                    : estadoActual.carrito.map((item) => item.id === id
                        ? { ...item, cantidadCarrito: item.cantidadCarrito - 1 }
                        : item
                    )
            }
        })
    }, [])

    const eliminarDelCarrito = useCallback((id) => {
        setEstado((estadoActual) => {
            const producto = estadoActual.carrito.find((item) => item.id === id)
            if (!producto) return estadoActual

            return {
                inventario: estadoActual.inventario.map((item) => item.id === id
                    ? { ...item, quantity: item.quantity + producto.cantidadCarrito }
                    : item
                ),
                carrito: estadoActual.carrito.filter((item) => item.id !== id)
            }
        })
    }, [])

    const vaciarCarrito = useCallback(() => {
        setEstado((estadoActual) => ({
            inventario: estadoActual.inventario.map((item) => {
                const enCarrito = estadoActual.carrito.find((producto) => producto.id === item.id)
                return enCarrito ? { ...item, quantity: item.quantity + enCarrito.cantidadCarrito } : item
            }),
            carrito: []
        }))
    }, [])

    const agregarAlInventario = useCallback((producto) => {
        setEstado((estadoActual) => {
            if (estadoActual.inventario.some((item) => item.id === producto.id)) {
                return estadoActual
            }

            return {
                ...estadoActual,
                inventario: [...estadoActual.inventario, producto]
            }
        })
    }, [])

    const valor = useMemo(() => {
        const totalArticulos = estado.carrito.reduce((suma, item) => suma + item.cantidadCarrito, 0)
        const totalPrecio = estado.carrito.reduce((suma, item) => suma + item.price * item.cantidadCarrito, 0)

        return {
            inventario: estado.inventario,
            carrito: estado.carrito,
            totalArticulos,
            totalPrecio,
            agregarAlCarrito,
            quitarProducto,
            eliminarDelCarrito,
            vaciarCarrito,
            agregarAlInventario
        }
    }, [estado, agregarAlCarrito, quitarProducto, eliminarDelCarrito, vaciarCarrito, agregarAlInventario])

    return <CartContext.Provider value={valor}>{children}</CartContext.Provider>
}

import { useCart } from "../context/useCart";
import { formatearPrecio } from "../formato";

export const Carrito = () => {
  const { carrito, inventario, totalArticulos, totalPrecio, agregarAlCarrito, quitarProducto, eliminarDelCarrito, vaciarCarrito } = useCart()

  const haySinStock = (id) => inventario.find((item) => item.id === id)?.quantity === 0

  return (
    <section id="carrito" aria-labelledby="carrito-titulo" className="mt-auto bg-[#3824b9] p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 id="carrito-titulo" className="text-xl font-bold text-white">
          Carrito {totalArticulos > 0 && <span className="font-normal">({totalArticulos})</span>}
        </h2>
        {carrito.length > 0 && (
          <button type="button" onClick={vaciarCarrito} className="rounded border border-white/60 px-3 py-1 text-white cursor-pointer hover:bg-white/10">
            Vaciar carrito
          </button>
        )}
      </div>

      {carrito.length === 0
        ? <p className="py-4 text-center text-white">Tu carrito está vacío.</p>
        : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {carrito.map((producto) => (
                <article key={producto.id} className="rounded bg-white border border-gray-800 p-3 flex flex-col items-center justify-center gap-2 text-center">
                  <h3 className="font-bold">{producto.name}</h3>
                  <p>{formatearPrecio(producto.price)} c/u</p>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => quitarProducto(producto.id)}
                      aria-label={`Quitar una unidad de ${producto.name}`}
                      className="h-8 w-8 rounded bg-gray-200 text-lg font-bold cursor-pointer hover:bg-gray-300"
                    >
                      −
                    </button>
                    <span aria-live="polite" className="min-w-8 font-bold">{producto.cantidadCarrito}</span>
                    <button
                      type="button"
                      onClick={() => agregarAlCarrito(producto)}
                      disabled={haySinStock(producto.id)}
                      aria-label={`Agregar una unidad de ${producto.name}`}
                      className="h-8 w-8 rounded bg-gray-200 text-lg font-bold cursor-pointer hover:bg-gray-300 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
                    >
                      +
                    </button>
                  </div>

                  <p className="font-bold text-[#087e52]">{formatearPrecio(producto.price * producto.cantidadCarrito)}</p>

                  <button type="button" onClick={() => eliminarDelCarrito(producto.id)} className="bg-[#b63b35] hover:bg-[#932f2a] text-white px-3 py-2 rounded cursor-pointer">
                    Quitar producto
                  </button>
                </article>
              ))}
            </div>

            <p className="mt-4 text-right text-lg font-bold text-white">
              Total: {formatearPrecio(totalPrecio)}
            </p>
          </>
        )}
    </section>
  )
}

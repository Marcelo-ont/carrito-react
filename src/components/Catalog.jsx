import { useCart } from "../context/useCart";
import { formatearPrecio } from "../formato";

export const Catalog = () => {
    const { inventario, agregarAlCarrito } = useCart()

    return (
        <section id="catalogo" aria-labelledby="catalogo-titulo" className="px-3">
            <h2 id="catalogo-titulo" className="mb-3 text-xl font-bold">Catálogo</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {inventario.map((product) => (
                    <article key={product.id} className="min-h-60 rounded border border-gray-800 p-3 flex items-center gap-3">
                        <div className="flex flex-1 min-w-0 flex-col items-start gap-1">
                            <h3 className="font-bold">{product.name}</h3>
                            <p className="font-bold text-[#087e52]">{formatearPrecio(product.price)}</p>
                            <p>Disponibles: {product.quantity}</p>
                            <p>{product.description}</p>
                            <button
                                type="button"
                                onClick={() => agregarAlCarrito(product)}
                                disabled={product.quantity === 0}
                                className="mt-1 bg-[#087e52] hover:bg-[#066340] text-white px-3 py-2 rounded cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {product.quantity === 0 ? "Sin disponibilidad" : "Agregar al carrito"}
                            </button>
                        </div>
                        <img src={product.image} alt={product.name} width="140" height="160" className="w-2/5 h-40 object-contain" />
                    </article>
                ))}
            </div>
        </section>
    )
}

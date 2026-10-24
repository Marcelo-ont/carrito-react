import { useCart } from "../context/useCart";

const PRODUCTO_NUEVO = {
    name: "Cámara nueva",
    id: 5,
    quantity: 6,
    price: 10500,
    image: "/products/camera.jpg",
    description: "Nueva cámara"
}

const Additem = () => {
    const { inventario, agregarAlInventario } = useCart()
    const yaAgregado = inventario.some((item) => item.id === PRODUCTO_NUEVO.id)

    return (
        <div className="px-3">
            <button
                type="button"
                onClick={() => agregarAlInventario(PRODUCTO_NUEVO)}
                disabled={yaAgregado}
                className="rounded bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
                {yaAgregado ? "Item agregado" : "Add item"}
            </button>
        </div>
    )
}

export default Additem

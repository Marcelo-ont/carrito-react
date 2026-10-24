import { useCart } from "../context/useCart";

const Navbar = () => {
  const { totalArticulos } = useCart()

  return (
    <nav className="flex justify-center bg-[#3824b9] px-4 py-1 text-white" aria-label="Navegación principal">
      <ul className="list-none flex gap-4">
        <li>
          <a href="#catalogo">Catálogo</a>
        </li>
        <li>
          <a href="#carrito">
            Carrito
            {totalArticulos > 0 && (
              <span aria-label={`${totalArticulos} artículos en el carrito`} className="ml-2 inline-block min-w-6 rounded-full bg-white px-2 text-center text-sm font-bold text-[#3824b9]">
                {totalArticulos}
              </span>
            )}
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar

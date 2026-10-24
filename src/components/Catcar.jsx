import { Catalog } from "./Catalog";
import { Carrito } from "./Carrito"
import Additem from "./Additem";

export const Catcar = () => {
    return (
        <main className="flex flex-1 flex-col gap-12">
            <Additem />
            <Catalog />
            <Carrito />
        </main>
    )
}

import Navbar from './components/Navbar'
import { Catcar } from './components/Catcar'
import { CartProvider } from './context/CartProvider'

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Catcar />
      </div>
    </CartProvider>
  )
}

export default App

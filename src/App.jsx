import './App.css'
import Header from './components/Header'
import TablaHistorico from './components/TablaHistorico'
import SeccionActualizacion from './components/SeccionActualizacion'
import FormularioConversion from './components/FormularioConversion'
import PublicationBox from './components/PublicationBox'
import ShoppingCart from './components/ShoppingCart'
import Footer from './components/Footer'
import Semaforo from './components/Semaforo'
import ToDo from './components/ToDo'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NoEncontrado from './components/NoEncontrado'
import NavBarCarrito from './components/products-store/NavBarCarrito'
import Inicio from './components/products-store/inicio'
import Catalogo from './components/products-store/Catalogo'
import ProductoDetalle from './components/products-store/ProductoDetalle'
import { CarritoProvider } from './components/products-store/CarritoContext'
import DetalleCompra from './components/products-store/DetalleCompra'
import { UsuarioProvider } from './components/products-store/UsuarioContext'
import NavBarSuperior from './components/products-store/NavBarSuperior'

function App() {
  return (
    <CarritoProvider>
      <UsuarioProvider>
        <BrowserRouter>
        <div className="app-container">
          <NavBarCarrito />
          <NavBarSuperior />
          <main className="main-page">
            <Routes>
              <Route path='/' element={<Inicio />} />
              <Route path='/products' element={<Catalogo />} />
              <Route path='/cart' element={<DetalleCompra />} />
              <Route path='*' element={<NoEncontrado />} />
              <Route path='/products/:id' element={<ProductoDetalle />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
      </UsuarioProvider>
    </CarritoProvider>
  )
}

export default App

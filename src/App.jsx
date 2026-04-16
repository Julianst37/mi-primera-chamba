import './App.css'
import Header from './components/Header'
import TablaHistorico from './components/TablaHistorico'
import SeccionActualizacion from './components/SeccionActualizacion'
import FormularioConversion from './components/FormularioConversion'
import PublicationBox from './components/PublicationBox'
import Footer from './components/Footer'
import Semaforo from './components/Semaforo'
import ToDo from './components/ToDo'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NoEncontrado from './components/NoEncontrado'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/historico" element={<TablaHistorico />} />
        <Route path="/actualizaciones" element={<SeccionActualizacion />} />
        <Route path="/divisas" element={<FormularioConversion />} />
        <Route path="/publicaciones" element={<PublicationBox />} />
        <Route path="*" element={<NoEncontrado />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App

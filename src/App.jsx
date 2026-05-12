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
import PaginaCompraBTC from './components/PaginaCompraBTC'
import Inicio from './components/products-store/Inicio'
import { UserValidatorForm } from './schemas/UserValidatorForm'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import { Update } from './components/crud/Update'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/historico" element={<TablaHistorico />} />
          <Route path="/actualizaciones" element={<SeccionActualizacion />} />
          <Route path="/publicaciones" element={<PublicationBox />} />
          <Route path="/compraBTC" element={<PaginaCompraBTC />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="/formularioBTC" element={<Update />} />
          <Route path="*" element={<NoEncontrado />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

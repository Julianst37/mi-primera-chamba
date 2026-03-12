import './App.css'
import Header from './components/Header'
import TablaHistorico from './components/TablaHistorico'
import SeccionActualizacion from './components/SeccionActualizacion'
import FormularioConversion from './components/FormularioConversion'
import PublicationBox from './components/PublicationBox'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Header />
      <main className="main-page">
        <TablaHistorico />
        <SeccionActualizacion />
        <FormularioConversion />
        <PublicationBox />
      </main>
      <Footer />
    </>
  )
}

export default App

import { useState } from 'react'
import '../styles/Semaforo.css'

export default function Semaforo() {
  const [colorLuz, setColorLuz] = useState('rojo')

  return(
    <div className='contenedor-semaforo'>
        <div className={`luz ${colorLuz}`}>
        </div>

        <button className='boton-cambiar-color' onClick={ () => setColorLuz(colorLuz === 'rojo' ? 'verde' : 'rojo')}>{colorLuz === "rojo" ? "Cambiar a Verde" : "Cambiar a Rojo"}</button>
    </div>

   )

}
import { useState } from 'react'
import Tarea from './Tarea'

export default function ToDo() {
  const [texto, setTexto] = useState('')
  const [tareas, setTareas] = useState([])
  const [categoria, setCategoria] = useState('estudio')
  const [aprobado, setAprobado] = useState(false)
  const [filtro, setFiltro] = useState('todas')

  const tareasFiltradas =
  filtro === "todas"
    ? tareas
    : tareas.filter(t => t.categoria === filtro);

  function handleAgregarTarea() {
    if (texto.trim() === '') return;

    const nuevaTarea = {
      id: Math.floor(Math.random() * 10000),
      contenido: texto,
      categoria: categoria,
    }
    debugger;

    setTareas([...tareas, nuevaTarea])
    setTexto('')
    setAprobado(tareas.length + 1 >= 4)
  }

  return (
    <div className="tareas-container">

      <div className="filtro-tareas">
        <p>Filtrar por:</p>
        <select className="select-filtro" onChange={(e) => setFiltro(e.target.value)} value={filtro}>
          <option value="todas">Todas las tareas</option>
          <option value="estudio">Estudio</option>
          <option value="ocio">Ocio</option>
          <option value="trabajo">Trabajo</option>
        </select>
      </div>

      <div className="tareas-add-section">
        <input
          id='input-tarea'
          type="text"
          placeholder="¿Qué hay que hacer?"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />

        <div className="acciones-tarea">
            <select id='select-categoria' className="select-categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            <option value="estudio">Estudio</option>
            <option value="ocio">Ocio</option>
            <option value="trabajo">Trabajo</option>
            </select>
            

            <button className="btn-agregar-tarea" onClick={handleAgregarTarea}>Agregar</button>
        </div>  

      </div>
      
      {aprobado && <div className='mensaje-aprobacion'>
         <label className='titulo-mensaje-aprobacion'><i className='fa fa-trophy icono-trofeo'></i>¡OBJETIVO LOGRADO!</label>
         <p className='texto-mensaje-aprobacion'>Has demostrado dominar las bases de React.</p>  
      </div>}

      <div className="tareas-list">
        {tareasFiltradas.length === 0 ? (
          <p className="no-tareas">No hay tareas en el momento.</p>
        ) : (
          tareasFiltradas.map((tarea) => (
            <Tarea 
              tarea={tarea}
              onDelete={(id) => setTareas(tareas.filter(t => t.id !== id), setAprobado(tareas.length - 1 >= 4))}
            />
          ))
        )}
      </div>
    </div>
  )
}

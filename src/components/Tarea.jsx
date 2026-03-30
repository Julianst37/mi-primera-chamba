export default function Tarea({ 
    tarea,
    onDelete,
}) {
  return (
    <div className="tarea-card">
        <div className="tarea-content">
            <p className="tarea-text">{tarea.contenido}</p>
            <span className="tarea-categoria">{tarea.categoria}</span>
        </div>
        <button className="btn-eliminar-tarea" onClick={() => onDelete(tarea.id)}>
            <i className="fa-solid fa-trash"></i>
        </button>
    </div>
  )
}

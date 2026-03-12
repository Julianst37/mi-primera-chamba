export default function PublicationCard({ 
  pub, 
  onDelete, 
  onLike, 
  reacciones 
}) {
  return (
    <div className="publication-card">
      <div className="publication-user-info">
        <div className="publication-header">
          <span className="publication-date">{pub.fecha}</span>
          <a className="btn-eliminar" onClick={() => onDelete(pub.id)}>
            <i className="fa-solid fa-trash"></i>
          </a>
        </div>
        <div className="publication-content">
          <div className="publication-avatar-container">
            <img className="publication-avatar" alt="Avatar usuario"
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png">
            </img>
            <p style={{fontWeight: 'bold'}}>{pub.usuario}</p>
          </div>
          <p className="publication-text">{pub.contenido}</p>
        </div>
      </div>
      <div className="publication-footer-actions">
         <div className="publication-actions">
            <a className="btn-like" title="Me gusta" onClick={() => onLike(pub.id)}>
              <i className="fa-solid fa-thumbs-up like-icon"></i>
            </a>
        </div>
        <span className="reacciones-contador">Reacciones: {reacciones[pub.id] || 0}</span>
       </div>   
    </div>
  )
}

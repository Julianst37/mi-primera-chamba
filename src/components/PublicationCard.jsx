import PublicationAvatar from './PublicationAvatar'
import PublicationActions from './PublicationActions'

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
          <PublicationAvatar usuario={pub.usuario} />
          <p className="publication-text">{pub.contenido}</p>
        </div>
      </div>
      <PublicationActions
        id={pub.id}
        onLike={onLike}
        reacciones={reacciones}
      />
    </div>
  )
}

export default function PublicationActions({ id, onLike, reacciones }) {
  return (
    <div className="publication-footer-actions">
      <div className="publication-actions">
        <a className="btn-like" title="Me gusta" onClick={() => onLike(id)}>
          <i className="fa-solid fa-thumbs-up like-icon"></i>
        </a>
      </div>
      <span className="reacciones-contador">
        Reacciones: {reacciones[id] || 0}
      </span>
    </div>
  )
}

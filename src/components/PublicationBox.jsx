import { useState } from 'react'
import '../styles/PublicationBox.css'
import PublicationCard from './PublicationCard'

export default function PublicationBox() {
  const [texto, setTexto] = useState('')
  const [publicaciones, setPublicaciones] = useState([])
  const [reacciones, setReacciones] = useState({})

  const caracteresCount = texto.length
  const maxCaracteres = 280
  const esValido = caracteresCount > 0 && caracteresCount <= maxCaracteres
  const personas = ['Julián', 'María', 'Carlos', 'Ana', 'Luis', 'Sofía', 'Diego', 'Valentina', 'Andrés', 'Camila']

  const handlePublicar = () => {
    if (esValido) {
      const nuevaPublicacion = {
        id: Date.now(),
        contenido: texto,
        fecha: new Date().toLocaleString('es-ES'),
        usuario: personas[Math.floor(Math.random() * personas.length)],
      }
      setPublicaciones([nuevaPublicacion, ...publicaciones])
      setTexto('')
    }
  }

  return (
    <div className="publication-container">
      <div className="publication-input-section">
        <textarea
          className="publication-textarea"
          placeholder="¿Que opiniones tienes de las divisas? Comparte tu opinión aquí..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          rows="4"
        />

        <div className="publication-footer">
          <div className="character-count">
            <span
              className={`count-text ${
                caracteresCount > 280 ? 'count-error' : ''
              }`}
            >
              {caracteresCount} / {maxCaracteres}
            </span>
          </div>
          <button
            className="btn-publicar"
            onClick={handlePublicar}
            disabled={!esValido}
          >
            Publicar
          </button>
        </div>
      </div>

      <div className="publications-list">
        {publicaciones.length === 0 ? (
          <p className="no-publications">No hay publicaciones en el momento.</p>
        ) : (
          publicaciones.map((pub) => (
            <PublicationCard 
              key={pub.id}
              pub={pub}
              reacciones={reacciones}
              onDelete={(id) => setPublicaciones(publicaciones.filter(p => p.id !== id))}
              onLike={(id) => setReacciones({ ...reacciones, [id]: (reacciones[id] || 0) + 1 })}
            />
          ))
        )}
      </div>
    </div>
  )
}

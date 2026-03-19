export default function PublicationAvatar({ usuario, avatarUrl = 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }) {
  return (
    <div className="publication-avatar-container">
      <img
        className="publication-avatar"
        alt="Avatar usuario"
        src={avatarUrl}
      />
      <p style={{ fontWeight: 'bold' }}>{usuario}</p>
    </div>
  )
}

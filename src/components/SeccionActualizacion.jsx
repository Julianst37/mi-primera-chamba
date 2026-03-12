function SeccionActualizacion() {
  const articulos = [
    {
      id: 'bitcoin',
      nombre: 'Bitcoin',
      imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/250px-Bitcoin.svg.png',
      valor: '1000USD',
    },
    {
      id: 'euro',
      nombre: 'Euro',
      imagen: 'https://cdn-icons-png.flaticon.com/512/3840/3840766.png',
      valor: '5000€',
    },
    {
      id: 'yen',
      nombre: 'Yen',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr4DdMZkrSf9MjBIB0qocG_rCY0aaMBF8j3g&s',
      valor: '5000¥',
    },
  ];

  return (
    <section id="ultima-actualizacion">
      <p>Actualizaciones de los valores de las divisas:</p>
      {articulos.map((articulo) => (
        <article key={articulo.id} id={`${articulo.id}-articulo`}>
          <img
            src={articulo.imagen}
            alt={`${articulo.nombre} imagen`}
            width="50px"
          />
          <span className="etiqueta-valor">{articulo.valor}</span>
        </article>
      ))}
    </section>
  );
}

export default SeccionActualizacion;

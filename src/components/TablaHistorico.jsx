function TablaHistorico() {
  const datos = [
    {
      id: 1,
      divisa: 'Dólar',
      fechaActualizacion: '18/02/2026',
      valor: '50.00 USD',
    },
    {
      id: 2,
      divisa: 'Euro',
      fechaActualizacion: '18/02/2026',
      valor: '500€',
    },
    {
      id: 3,
      divisa: 'Yen Japonés',
      fechaActualizacion: '18/02/2026',
      valor: '500¥',
    },
  ];

  return (
    <section id="historico-valores">
      <table className="tabla-divisas">
        <thead>
          <tr>
            <th>Divisa</th>
            <th>Fecha actualización</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((fila) => (
            <tr key={fila.id}>
              <td>{fila.divisa}</td>
              <td>{fila.fechaActualizacion}</td>
              <td>{fila.valor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default TablaHistorico;

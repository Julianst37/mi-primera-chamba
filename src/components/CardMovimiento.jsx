function CardMovimiento({ movimiento }) {
  return (
    <div className="card-movimiento">
        <div className="detalle-movimiento">
            <p style={{fontWeight: 'bold'}}>{movimiento.movimiento}</p>
            <p>{movimiento.fecha}</p>
        </div>
        <p className="valor-movimiento">{movimiento.categoria === 'compra' ? '+' : '-'} {movimiento.cantidadBTC} BTC</p>
    </div>
  );
}

export default CardMovimiento;
import { useContext } from 'react';
import { BTCContext } from './BTCContext';

function TarjetaSaldoBTC() {
  const btcContext = useContext(BTCContext);

  if (!btcContext) {
    return <div>Error: BTCContext no disponible</div>;
  }

  const { saldoBTC, saldoUSD, cash } = btcContext;

  return (
    <div className="tarjeta-saldo-btc">
      <h2 className="titulo-tarjeta">SALDO EN BITCOIN (BTC)</h2>
      <div className="saldo-cantidad">
        <span className="numero-saldo">{saldoBTC.toFixed(8)}</span>
      </div>
      <div className="divisa-btc">
        <span className="texto-btc">BTC</span>
      </div>
      <div className="info-adicional">
        <span className="usd">=$ {saldoUSD.toFixed(2)} USD</span>
        <span className="separador">|</span>
        <span className="cash">cash: ${cash.toLocaleString('es-CO')}</span>
      </div>
    </div>
  );
}

export default TarjetaSaldoBTC;

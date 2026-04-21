import { createContext, useState, ReactNode } from 'react';
import { BTCContextType, BTCProviderProps } from '../interfaces/BTCContext';
import { DetalleMovimiento } from '../interfaces/DetalleMovimiento';

export const BTCContext = createContext<BTCContextType | undefined>(undefined);

export function BTCProvider({ children }: BTCProviderProps) {
  const [saldoBTC, setSaldoBTC] = useState<number>(0);
  const [saldoUSD, setSaldoUSD] = useState<number>(0);
  const [cash, setCash] = useState<number>(10000);
  const [precioActualBTC, setPrecioActualBTC] = useState<number>(65000);
  const [listaMovimientos, setListaMovimientos] = useState<DetalleMovimiento[]>([]);

  const fechaFormateada = new Date().toLocaleString('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });


  const comprarBTC = (cantidadBTC: number, montoUSD: number): boolean => {
    if (cash >= montoUSD) {
      setSaldoBTC((prev) => prev + cantidadBTC);
      setCash((prev) => prev - montoUSD);
      setSaldoUSD((prev) => prev + montoUSD);


      const nuevoMovimiento: DetalleMovimiento = {
        id: listaMovimientos.length + 1,
        categoria: 'compra',
        movimiento: 'Orden de Comprar',
        fecha: fechaFormateada,
        cantidadBTC: Number(cantidadBTC.toFixed(8)),
      };
      setListaMovimientos((prev) => [...prev, nuevoMovimiento]);
      return true;
    }
    return false;
  };

  const venderBTC = (cantidadBTC: number): boolean => {
    if (saldoBTC >= cantidadBTC) {
      const montoUSD = cantidadBTC * precioActualBTC;
      setSaldoBTC((prev) => prev - cantidadBTC);
      setCash((prev) => prev + montoUSD);
      setSaldoUSD((prev) => Math.max(0, prev - montoUSD));

      const nuevoMovimiento: DetalleMovimiento = {
        id: listaMovimientos.length + 1,
        categoria: 'venta',
        movimiento: 'Orden de Vender',
        fecha: fechaFormateada,
        cantidadBTC: Number(cantidadBTC.toFixed(8)),
      };
      setListaMovimientos((prev) => [...prev, nuevoMovimiento]);
      return true;
    }
    return false;
  };

  const value: BTCContextType = {
    saldoBTC,
    saldoUSD,
    cash,
    precioActualBTC,
    comprarBTC,
    venderBTC,
    setPrecioActualBTC,
    listaMovimientos,
  };

  return <BTCContext.Provider value={value}>{children}</BTCContext.Provider>;
}

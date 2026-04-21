import { DetalleMovimiento } from "./DetalleMovimiento";

export interface BTCContextType {
  saldoBTC: number;
  saldoUSD: number;
  cash: number;
  precioActualBTC: number;
  comprarBTC: (cantidad: number, monto: number) => boolean;
  venderBTC: (cantidad: number) => boolean;
  setPrecioActualBTC: (precio: number) => void;
  listaMovimientos?: DetalleMovimiento[];
}

export interface BTCProviderProps {
  children: React.ReactNode;
}

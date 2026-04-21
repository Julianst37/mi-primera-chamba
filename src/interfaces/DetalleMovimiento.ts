export interface DetalleMovimiento {
    id: number;
    categoria: 'compra' | 'venta';
    movimiento: 'Orden de Comprar' | 'Orden de Vender';
    fecha: string;
    cantidadBTC: number;
}
import { createContext, useState } from "react";

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
 
   setCarrito((prevCarrito) => {
    const productoExistente = prevCarrito.find(
      item => item.id === producto.id
    );

    if (productoExistente) {
      return prevCarrito.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
    } else {
      return [...prevCarrito, { ...producto, cantidad: 1 }];
    }
  });
  };

  const eliminarDelCarrito = (productoId) => {
    setCarrito((prevCarrito) => prevCarrito.filter((item) => item.id !== productoId));
  };

  const actualizarCantidad = (productoId, cantidad) => {
    setCarrito((prevCarrito) =>
      prevCarrito.map((item) =>
        item.id === productoId ? { ...item, cantidad } : item
      )
    );
  };

  const limpiarCarrito = () => {
    setCarrito([]);
  }

  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito, actualizarCantidad, limpiarCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
}
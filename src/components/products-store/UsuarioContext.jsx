import { createContext, useState } from "react";

export const UsuarioContext = createContext();

export function UsuarioProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  const login = (usuario) => {
    setUsuario(usuario);
  };

  const logout = () => {
    setUsuario(null);
  };

  return (
    <UsuarioContext.Provider value={{ usuario, login, logout }}>
      {children}
    </UsuarioContext.Provider>
  );
}
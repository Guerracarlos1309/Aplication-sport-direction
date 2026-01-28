import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

// Usuarios "quemados" (Hardcoded) para modo demostración
const MOCK_USERS = [
  {
    username: "entrenador",
    password: "1234",
    role: "DT",
    player_id: null,
    player_name: "Staff Técnico",
  },
  {
    username: "carlos",
    password: "1234",
    role: "Jugador",
    player_id: 1,
    player_name: "Carlos Ruiz",
  },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("sport_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (username, password) => {
    // Simulamos una pequeña latencia para que se vea el cargando
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = MOCK_USERS.find(
          (u) => u.username === username && u.password === password,
        );

        if (foundUser) {
          const userData = { ...foundUser };
          delete userData.password; // Por seguridad mockeada
          setUser(userData);
          localStorage.setItem("sport_user", JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error("Credenciales inválidas"));
        }
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("sport_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

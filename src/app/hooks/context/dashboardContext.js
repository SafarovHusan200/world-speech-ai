import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  return (
    <AuthContext.Provider
      value={{ user, setUser, password, setPassword, username, setUsername }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useDashboard = () => {
  return useContext(AuthContext);
};

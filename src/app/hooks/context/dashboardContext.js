import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        setIsLogin,
        user,
        setUser,
        password,
        setPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useDashboard = () => {
  return useContext(AuthContext);
};

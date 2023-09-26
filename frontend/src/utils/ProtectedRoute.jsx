import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getMe } from "./auth/authSlice";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (!token) {
      return;
    }
    // Dispara uma ação 'getMe' com o token para autenticar o usuário.
    dispatch(getMe(token));
  }, []);

  const auth = useSelector((state) => state.auth);
  let location = useLocation();

  // Se não houver um usuário autenticado, redireciona para a página de login, incluindo a localização atual.
  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;

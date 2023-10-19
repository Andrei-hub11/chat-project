import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FormKit from "../../components/FormKit/FormKit";
import { useNavigate } from "react-router-dom";

import useMenuToggleState from "../../utils/customHooks/useMenuToggleState";
import { fieldsLogin } from "../../utils/formFields/fields";
import { toast } from "react-toastify";
import { login, reset } from "../../utils/auth/authSlice";

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  const { closeMenu, isMenuOpen } = useMenuToggleState();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success("Login bem-sucedido! Bem-vindo(a) de volta|");
      navigate("/home");
    }

    dispatch(reset());
  }, [isError, isSuccess, message, dispatch]);

  const handleLogin = (values) => {
    dispatch(login(values));
  };

  const handleFormToggle = (form) => {
    if (form === "register") {
      navigate("/register");
    }
  };

  const formKitProps = {
    otherData: {
      titleForm: "Login",
      closeMenu,
      openMenu: handleFormToggle,
      isOpen: isMenuOpen,
      menu: "login",
      toggleMenu: "register",
      alternativeText: "Ainda não possui uma conta?",
      toggleBtn: "Criar uma",
      formSize: "32rem",
      isLoading: isLoading,
    },
    handleFormAction: handleLogin,
    fields: fieldsLogin,
  };

  return (
    <div>
      <FormKit {...formKitProps} />
    </div>
  );
};

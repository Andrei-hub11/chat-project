import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FormKit from "../../components/FormKit/FormKit";
import { useNavigate } from "react-router-dom";

import useMenuToggleState from "../../utils/customHooks/useMenuToggleState";
import { fieldsRegister } from "../../utils/formFields/fields";
import { toast } from "react-toastify";
import { register, reset } from "../../utils/auth/authSlice";

export const RegisterPage = () => {
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
      toast.success("Registro realizado com sucesso. Seja bem-vindo(a)!");
      navigate("/home");
    }

    dispatch(reset());
  }, [isError, isSuccess, message, dispatch]);

  const handleRegister = (values) => {
    dispatch(register(values));
  };

  const handleFormToggle = (form) => {
    if (form === "login") {
      navigate("/login");
    }
  };

  const formKitProps = {
    otherData: {
      titleForm: "Registre-se",
      closeMenu,
      openMenu: handleFormToggle,
      isOpen: isMenuOpen,
      menu: "register",
      toggleMenu: "login",
      alternativeText: "Já possui uma conta?",
      toggleBtn: "Fazer login",
      formSize: "38rem",
      isLoading: isLoading,
    },
    handleFormAction: handleRegister,
    fields: fieldsRegister,
  };

  return (
    <div>
      <FormKit {...formKitProps} />
    </div>
  );
};

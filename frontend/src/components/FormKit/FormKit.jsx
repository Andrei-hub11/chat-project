import React, { useState } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as yup from "yup";

import {
  BoxForm,
  BoxCloseMenu,
  CloseIcon,
  TitleForm,
  FormControl,
  Form,
  FormBtnBox,
  FormInput,
  LabelForm,
  FormMsg,
  BtnForm,
  StyledLoader,
  LoaderContainer,
  VisiblePassword,
} from "./FormKitStyle";
import CloseMenuIcon from "../../images/x.svg";
import VisibilityOffIcon from "../../images/eye.svg";
import VisibilityIcon from "../../images/eye-off.svg";

const FormKit = ({ otherData, fields, handleFormAction }) => {
  const {
    titleForm,
    closeMenu,
    openMenu,
    menu,
    toggleMenu,
    alternativeText,
    toggleBtn,
    formSize,
    isLoading,
  } = otherData;

  const [visiblePassword, setVisiblePassword] = useState(true);

  // Cria um objeto de initialValues a partir de um array de campos (fields).
  const initialValues = Object.fromEntries(
    fields.map((field) => [field.name, field.initialValue || ""])
  );

  // Cria um objeto de validações usando a biblioteca 'yup' para definir regras de validação.
  const validations = yup.object().shape(
    Object.fromEntries(
      fields.map((field) => [
        field.name,
        // Se houver uma função de validação personalizada no campo, ela será usada.
        field.validation || yup.string().required(`${field.label} is required`), // Define uma regra padrão que exige um valor não vazio.
      ])
    )
  );

  const onSubmit = async (values, actions) => {
    handleFormAction(values);
    closeMenu(menu);
    actions.resetForm();
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema: validations,
    onSubmit,
  });

  const rotation = {
    initial: {
      rotate: 0,
    },
    animated: {
      rotate: 360,
      transition: {
        duration: 0.5,
        loop: Infinity,
        ease: "linear",
      },
    },
  };

  return (
    <BoxForm
      size={formSize ? formSize : ""}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.3, 0.5, 0.7, 1],
        transition: { duration: 1, delay: 0.2 },
      }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
    >
      {menu !== "login" && menu !== "register" ? (
        <BoxCloseMenu>
          <CloseIcon
            src={CloseMenuIcon}
            onClick={() => {
              closeMenu(menu);
            }}
          />
        </BoxCloseMenu>
      ) : null}
      <TitleForm>{titleForm}</TitleForm>
      <Form onSubmit={handleSubmit}>
        {fields.map((field) => {
          return (
            <FormControl key={field.name}>
              <FormInput
                type={visiblePassword ? field.type : "text"}
                value={values[field.name] || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder=""
                id={field.name}
                isError={
                  errors[field.name] && touched[field.name] ? true : false
                }
                autoComplete="off"
                aria-autocomplete="none"
              />
              <LabelForm htmlFor="name">{field.label}</LabelForm>
              <FormMsg
                isError={
                  errors[field.name] && touched[field.name] ? true : false
                }
              >
                {errors[field.name]}
              </FormMsg>
              {field.type === "password" ? (
                <VisiblePassword
                  src={visiblePassword ? VisibilityOffIcon : VisibilityIcon}
                  onClick={() => setVisiblePassword(!visiblePassword)}
                />
              ) : null}
            </FormControl>
          );
        })}

        <p>
          {alternativeText}{" "}
          <span
            onClick={() => {
              closeMenu(menu);
              openMenu(toggleMenu);
            }}
          >
            {toggleBtn}
          </span>
        </p>

        {menu === "createRoom" || menu === "joinRoom" ? (
          <FormBtnBox hasloading={false.toString()}>
            <BtnForm
              primary={true.toString()}
              hasloading={false.toString()}
              disabled={isSubmitting}
              type="submit"
            >
              Enviar
            </BtnForm>
            <BtnForm
              onClick={() => closeMenu(menu)}
              hasloading={false.toString()}
              primary={false.toString()}
              type="button"
            >
              Cancelar
            </BtnForm>
          </FormBtnBox>
        ) : (
          <FormBtnBox hasloading={true.toString()}>
            <BtnForm
              primary={true.toString()}
              hasloading={true.toString()}
              disabled={isSubmitting}
              type="submit"
            >
              {!isLoading ? (
                "Enviar"
              ) : (
                <LoaderContainer
                  variants={rotation}
                  initial="initial"
                  animate="animated"
                >
                  <StyledLoader />
                </LoaderContainer>
              )}
            </BtnForm>
          </FormBtnBox>
        )}
      </Form>
    </BoxForm>
  );
};

FormKit.propTypes = {
  otherData: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired,
  handleFormAction: PropTypes.func.isRequired,
};

export default FormKit;

import React from "react";
import PropTypes from "prop-types";
import {
  BoxForm,
  BoxCloseMenu,
  CloseIcon,
  TitleForm,
  FormControl,
  Form,
  FormBtnBox,
  InputForm,
  LabelForm,
  ContactFormMsg,
  BtnForm,
} from "./FormKitstyle";
import * as yup from "yup";
import CloseMenuIcon from "../../images/x.svg";
import { useFormik } from "formik";

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
  } = otherData;

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
              <InputForm
                type={field.type || "text"}
                value={values[field.name] || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder=""
                id={field.name}
                isError={
                  errors[field.name] && touched[field.name] ? true : false
                }
              />
              <LabelForm htmlFor="name">{field.label}</LabelForm>
              <ContactFormMsg
                isError={
                  errors[field.name] && touched[field.name] ? true : false
                }
              >
                {errors[field.name]}
              </ContactFormMsg>
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
          <FormBtnBox>
            <BtnForm
              primary={true.toString()}
              disabled={isSubmitting}
              type="submit"
            >
              Salvar
            </BtnForm>
            <BtnForm
              onClick={() => closeMenu(menu)}
              primary={false.toString()}
              type="button"
            >
              Cancelar
            </BtnForm>
          </FormBtnBox>
        ) : (
          <FormBtnBox>
            <BtnForm
              primary={true.toString()}
              disabled={isSubmitting}
              type="submit"
            >
              Enviar
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

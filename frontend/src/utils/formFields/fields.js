import * as yup from "yup";

export const fieldsCreateChat = [
  {
    name: "roomName",
    label: "Nome do chat",
    validation: yup
      .string()
      .min(2, "Informe um nome válido")
      .required("O nome é requerido"),
  },
];

export const fieldsEnterTheChat = [
  {
    name: "roomId",
    label: "ID do chat",
    validation: yup
      .string()
      .min(2, "Informe um ID válido")
      .required("O ID é requerido"),
  },
];

export const fieldsRegister = [
  {
    name: "name",
    label: "Nome",
    validation: yup.string().required("O nome é requerido"),
  },
  {
    name: "email",
    label: "Adcione um email",
    validation: yup
      .string()
      .email("Digite um email válido")
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
        "O email deve seguir o formato padrão de endereços de email"
      )
      .required("O email é obrigatório"),
  },
  {
    name: "password",
    label: "Diga-me uma senha",
    validation: yup
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .matches(
        /^(?=(?:[^!@#$%^&*]*[!@#$%^&*]){2})([A-Za-z\d!@#$%^&*]+)$/,
        "A senha deve conter pelo menos 2 caracteres especiais"
      )
      .required("A senha é obrigatória"),
  },
];

export const fieldsLogin = [
  {
    name: "email",
    label: "Adcione um email",
    validation: yup
      .string()
      .email("Digite um email válido")
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
        "O email deve seguir o formato padrão de endereços de email"
      )
      .required("O email é obrigatório"),
  },
  {
    name: "password",
    label: "Diga-me sua senha",
    validation: yup
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .matches(
        /^(?=(?:[^!@#$%^&*]*[!@#$%^&*]){2})([A-Za-z\d!@#$%^&*]+)$/,
        "A senha deve conter pelo menos 2 caracteres especiais"
      )
      .required("A senha é obrigatória"),
  },
];

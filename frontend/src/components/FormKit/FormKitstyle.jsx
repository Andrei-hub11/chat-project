import styled from "styled-components";
import { motion } from "framer-motion";

export const BoxForm = styled(motion.div)`
  /* display: ${(props) => (props.formOpen ? "block" : "none")}; */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: ${({ size }) => (size ? size : "27rem")};
  width: 35rem;
  border-radius: 3rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  background: #fff;
  z-index: 1000;
`;

export const BoxCloseMenu = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export const CloseIcon = styled.img`
  height: 3rem;
  filter: invert(13%) sepia(0%) saturate(1%) hue-rotate(38deg) brightness(101%)
    contrast(97%);
  cursor: pointer;
`;

export const TitleForm = styled.h1`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 1rem;
  color: rgba(0, 0, 0, 0.4);
`;

export const Form = styled.form`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  flex-direction: column;
  row-gap: 0.5rem;

  p {
    margin-top: 2.5rem;
    font-size: 1.4rem;
  }

  span {
    cursor: pointer;
    color: blue;
  }
`;

export const FormControl = styled.div`
  top: 2rem;
  padding: 1rem 0;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const InputForm = styled.input`
  position: relative;
  font-size: 1.5rem;
  font-weight: 400;
  width: 30rem;
  height: 3.5rem;
  border: ${(props) =>
    props.isError ? ".2rem solid #ff0000" : "0.2rem solid #808080"};
  border-radius: 3rem;
  outline: 0;
  background-color: white;
  color: #333;
  padding-left: 1rem;
  caret-color: #3366ff;

  &::placeholder {
    color: transparent;
  }

  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 5rem white inset;
  }
`;

export const ContactFormMsg = styled.small`
  position: absolute;
  font-size: 1rem;
  font-weight: 700;
  color: #ff0000;
  bottom: -0.8rem;
`;

export const LabelForm = styled.label`
  position: absolute;
  top: 0.7rem;
  left: 1rem;
  font-size: 1rem;
  display: block;
  transition: 0.2s;
  color: #80868b;
  padding: 0 0.6rem;
  height: 0.7rem;
  background: white;
  text-align: center;
  pointer-events: none;

  ${InputForm}:placeholder-shown + & {
    font-size: 1.4rem;
    cursor: text;
    top: 1.9rem;
    left: 1.8rem;
    color: #80868b;
    font-weight: 400;
  }

  ${InputForm}:focus + & {
    top: 0.7rem;
    left: 1rem;
    font-size: 1rem;
    font-weight: 400;
    color: #1a73e8;
  }
`;

export const FormBtnBox = styled.div`
  position: relative;
  top: 3rem;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  column-gap: 1rem;
`;

export const BtnForm = styled(motion.button)`
  margin-right: 2rem;
  font-size: 1.5rem;
  color: #fff;
  padding: 0.7rem 2.5rem;
  border-radius: 3rem;
  border: none;
  background: ${(props) => (props.primary === "true" ? "#3366ff" : "#ff0000")};
  box-shadow: rgba(100, 100, 111, 0.6) 0px 7px 29px 0px;
  cursor: pointer;
`;

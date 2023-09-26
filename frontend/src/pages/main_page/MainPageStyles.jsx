import styled from "styled-components";
import { motion } from "framer-motion";

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 340px 1fr;
  grid-template-rows: 55px 1fr 50px;
  /*  grid-template-areas:
    "aside headerchat"
    "aside main"
    "aside main"; */
  grid-template-areas: ${(props) =>
    props.showHeader
      ? '"aside headerchat" "aside main" "aside main"'
      : '"aside headerchat" "aside main" "aside input"'};
  height: 100vh;
  background: linear-gradient(45deg, #141e30, #243b55);
`;

export const Header = styled.div`
  grid-area: headerchat;
  display: flex;
  justify-content: ${(props) => {
    props.isOpenChat ? "" : "space-between";
  }};
  align-items: ${(props) => {
    props.isOpenChat ? "" : "center";
  }};
  border: 1px solid red;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  h1 {
    color: #fff;
    font-weight: bold;
  }
`;

export const Main = styled.div`
  grid-area: main;
  position: ${(props) => (props.showHeader ? "relative" : "")};
  display: flex;
  justify-content: ${(props) => (props.showHeader ? "center" : "")};
  align-items: ${(props) => (props.showHeader ? "center" : "")};
  flex-direction: ${(props) => (props.showHeader ? "" : "column")};
  border: 1px solid red;
  padding: 1rem;
  overflow: hidden auto;
  scrollbar-width: thin;
  scrollbar-color: #000 transparent;

  &::-webkit-scrollbar {
    width: 1rem; /* Largura da barra de rolagem vertical */
    height: 1rem; /* Altura da barra de rolagem horizontal */
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 1rem; /* Raio das bordas da alça */
    background-color: #000;
  }
`;

export const InputMessageBox = styled.div`
  grid-area: input;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const SendIconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  border-radius: 2rem;
  border: 0.2rem solid #3366ff;
  background: #fff;
  cursor: pointer;

  & img {
    height: 3rem;
    filter: invert(33%) sepia(40%) saturate(4626%) hue-rotate(218deg)
      brightness(100%) contrast(103%);
  }
`;

export const ChatInput = styled.input`
  background: #fff;
  outline: none;
  border: 0.2rem solid #3366ff;
  border-radius: 2rem;
  height: 4rem;
  width: 100%;
  box-shadow: rgba(100, 100, 111, 0.6) 0px 7px 29px 0px;

  &::placeholder {
    color: #000000;
  }
`;

export const SplashBox = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 35rem;
  gap: 2rem;
`;

export const SplashImageBox = styled(motion.div)`
  height: 25rem;
  width: 25rem;

  & img {
    width: 100%;
    object-fit: contain;
  }
`;

export const InitialText = styled.p`
  text-align: justify;
  font-size: 1.8rem;
  font-weight: 400;
  letter-spacing: 0.2rem;
  font-family: "Raleway", sans-serif;
  color: #fff;
`;

export const ChatLogo = styled.p`
  font-family: "Dosis", sans-serif;
  font-size: 1.6rem;
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
  letter-spacing: 0.2rem;

  & span {
    color: #3366ff;
  }
`;

export const CreatingChatAndNotification = styled.div`
  display: flex;
  gap: 2rem;
`;

export const CreateChat = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.5rem;
  height: 3rem;
  background: #fff;
  cursor: pointer;
  border: 0.2rem solid #3366ff;

  & img {
    filter: invert(32%) sepia(32%) saturate(6857%) hue-rotate(220deg)
      brightness(102%) contrast(101%);
  }
`;

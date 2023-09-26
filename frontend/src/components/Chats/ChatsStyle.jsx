import styled from "styled-components";
import { motion } from "framer-motion";

/* // Array de cores
const cores = ["#FF0000", "#00FF00", "#FF00FF", "#FFFF00"]; */

/* // Função para selecionar uma cor aleatória do array
const handleSelectColor = () => {
  const indice = Math.floor(Math.random() * cores.length);
  return cores[indice];
}; */

export const ChatMessage = styled(motion.div)`
  display: flex;
  flex-direction: column;
  margin-right: ${(props) => (props.issender === "true" ? "" : "auto")};
  margin-left: ${(props) => (props.issender === "true" ? "auto" : "")};
  margin-bottom: 2rem;
  max-width: 50%;
  min-width: 30rem;
  word-wrap: break-word;
  height: auto;
  gap: 1rem;
  padding: 2rem;
  border-radius: ${(props) =>
    props.issender === "true" ? "1rem 4rem" : "4rem 1rem"};
  background: ${(props) => (props.issender === "true" ? "#0000FF" : "#00FF00")};
`;

export const MessagerSender = styled.p`
  display: ${(props) => (props.isSender ? "none" : "block")};
  text-align: left;
  font-size: 1.6rem;
  font-weight: 600;
  color: #fff;
`;

export const Message = styled(MessagerSender)`
  color: #fff;
  overflow: auto;
`;

export const MessageTime = styled(MessagerSender)`
  text-align: right;
`;

export const CopyContainer = styled.div`
  display: flex;
  justify-content: space-between;
  & img {
    filter: invert(99%) sepia(0%) saturate(7494%) hue-rotate(211deg)
      brightness(103%) contrast(100%);
    cursor: pointer;
  }
`;

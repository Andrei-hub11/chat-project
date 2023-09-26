import styled from "styled-components";
import { motion } from "framer-motion";

export const Notifications = styled(motion.div)`
  z-index: 1000;
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  top: 7rem;
  right: 10%;
  width: 65rem;
  height: auto;
  border-radius: 2rem;
  background: #fff;
`;

export const NotificationContainer = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
`;

export const NotificationImage = styled.div`
  border-radius: 50%;
  width: 6rem;
  height: 6rem;
  background: black;
`;

export const NotificationSubContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-direction: row;
`;

export const NotificationContainerBtn = styled(NotificationSubContainer)`
  flex-direction: column;
  gap: 1rem;
`;

export const NotificationUsername = styled.p`
  font-size: 1.8rem;
`;

export const NotificationsBtn = styled.button`
  font-size: 1.1rem;
  text-transform: uppercase;
  color: #fff;
  padding: 0.8rem 2rem 0.8rem 2.5rem;
  text-align: center;
  margin-right: 1rem;
  border-radius: 3rem;
  border: none;
  background: ${(props) => (props.primary ? "#3366ff" : "red")};
  box-shadow: rgba(100, 100, 111, 0.6) 0px 7px 29px 0px;
  cursor: pointer;
`;

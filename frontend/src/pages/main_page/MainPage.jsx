import React, { useMemo } from "react";
import {
  ChatInput,
  ChatLogo,
  GridContainer,
  Header,
  InitialText,
  InputMessageBox,
  Main,
  SendIconBox,
  SplashBox,
  SplashImageBox,
} from "./MainPageStyles";

import { motion } from "framer-motion";
import io from "socket.io-client";

import { Chats } from "../../components/Chats/Chats";
import SplashImage from "../../images/splashimage.jpg";
import SendIcon from "../../images/bxs-send.svg";
import { Notification } from "../../components/Notifications/Notification";
import useMainPageLogic from "./MainPageLogic";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import FormKit from "../../components/FormKit/FormKit";
import useMenuToggleState from "../../utils/customHooks/useMenuToggleState";
import {
  fieldsCreateChat,
  fieldsEnterTheChat,
} from "../../utils/formFields/fields";

const apiUrl = process.env.REACT_APP_API_URL;

const socket = io(apiUrl);

const Chat = () => {
  const {
    openHeader,
    currentUser,
    selectedRoom,
    alerts,
    roomData,
    message,
    filteredChat,
    currentChatName,
    handleSearchChat,
    handleKeyPress,
    handleMessageText,
    handleCreateRoom,
    handleRequestToJoinRoom,
    handleResponseToRequester,
    handleSelectedChat,
    handleChatName,
    handleClearingAlerts,
    sendMessage,
  } = useMainPageLogic(socket);
  const { openMenu, closeMenu, isMenuOpen } = useMenuToggleState();

  const chatsProps = useMemo(() => {
    return {
      handleChatName,
      chatData: roomData?.filter((chat) => chat._id === selectedRoom),
      user: currentUser,
      currentRoom: selectedRoom,
    };
  }, [handleChatName, roomData, currentUser, selectedRoom]);

  const sidebarProps = {
    openMenu,
    handleSelectedChat,
    handleSearchChat,
    currentRoom: selectedRoom,
    notifications: alerts,
    chatData: roomData,
    filteredChat,
  };

  const createRoomProps = {
    otherData: {
      titleForm: "Criar um chat",
      closeMenu,
      openMenu,
      isOpen: isMenuOpen,
      menu: "createRoom",
      toggleMenu: "joinRoom",
      alternativeText: "Deseja entrar em uma sala existente?",
      toggleBtn: "Juntar-se",
    },
    fields: fieldsCreateChat,
    handleFormAction: handleCreateRoom,
  };

  const notificationsProps = {
    notifications: alerts,
    onResponseToRequester: handleResponseToRequester,
    onClearingNotifications: handleClearingAlerts,
    closeMenu,
  };

  const joinRoomProps = {
    otherData: {
      titleForm: "Juntar-se a um chat",
      closeMenu,
      openMenu,
      isOpen: isMenuOpen,
      menu: "joinRoom",
      toggleMenu: "createRoom",
      alternativeText: "Não tem um chat para entar?",
      toggleBtn: "Criar um",
    },
    fields: fieldsEnterTheChat,
    handleFormAction: handleRequestToJoinRoom,
  };

  return (
    <GridContainer showHeader={openHeader}>
      <Sidebar {...sidebarProps} />

      {openHeader ? (
        <Header isOpenChat={true}>
          <div>
            <ChatLogo>
              Hexag<span>onal</span>
            </ChatLogo>
          </div>
        </Header>
      ) : null}
      {/*    <Notification /> */}
      {openHeader ? (
        <Main showHeader={openHeader}>
          <SplashBox>
            <SplashImageBox>
              <img src={SplashImage} alt="" />
            </SplashImageBox>
            <InitialText>
              Envie e receba messagens, <br /> junte-se a seus amigos em um
              chat!
            </InitialText>
          </SplashBox>
          {isMenuOpen("notifications") ? (
            <Notification {...notificationsProps} />
          ) : null}
          {isMenuOpen("createRoom") ? (
            <FormKit {...createRoomProps} />
          ) : isMenuOpen("joinRoom") ? (
            <FormKit {...joinRoomProps} />
          ) : null}
        </Main>
      ) : (
        <>
          <Header isOpenChat={true}>
            <div>
              <motion.h1
                key={currentChatName}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.3, 0.5, 0.7, 1],
                  transition: { duration: 1, delay: 0.2 },
                }}
              >
                {currentChatName}
              </motion.h1>
            </div>
          </Header>
          <Main showHeader={openHeader}>
            <Chats {...chatsProps} />
          </Main>
          <InputMessageBox>
            <ChatInput
              placeholder="Digite uma mensagem"
              value={message}
              onChange={(e) => {
                handleMessageText(e);
              }}
              onKeyDown={(e) => handleKeyPress(e)}
            />
            <SendIconBox>
              <img src={SendIcon} alt="" onClick={sendMessage} />
            </SendIconBox>
          </InputMessageBox>
          {isMenuOpen("notifications") ? (
            <Notification {...notificationsProps} />
          ) : null}
          {isMenuOpen("createRoom") ? (
            <FormKit {...createRoomProps} />
          ) : isMenuOpen("joinRoom") ? (
            <FormKit {...joinRoomProps} />
          ) : null}
        </>
      )}
    </GridContainer>
  );
};

export default Chat;

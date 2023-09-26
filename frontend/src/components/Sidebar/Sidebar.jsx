import React from "react";

import dayjs from "dayjs";
import { useDispatch } from "react-redux";

import {
  SideBar,
  SideBarMainBox,
  SideBarBtnBox,
  ChatNotification,
  ShortcutToChat,
  NumberOfNotofications,
  ChatLastmessage,
  ChatImageBox,
  ChatTitle,
  MessageTime,
  TitleBoxAndLastmessage,
  SearchChat,
  SearchContainer,
  ShortcutContainer,
  SideBarMainBox_2,
  SideBarMainBox_3,
} from "./SidebarStyle";
import PlusIcon from "../../images/bx-plus.svg";
import NotificationIcon from "../../images/bxs-bell.svg";
/* import dataChat from "../../data"; */
import SearchIcon from "../../images/bx-search.svg";
import SplashImage from "../../images/splashimage.jpg";
import LogoutIcon from "../../images/bx-exit.svg";
import { logout } from "../../utils/auth/authSlice";

export const Sidebar = ({
  openMenu,
  handleSelectedChat,
  handleSearchChat,
  notifications,
  chatData,
  filteredChat,
}) => {
  const dispatch = useDispatch();
  const handleMenu = (menuName) => {
    openMenu(menuName);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <SideBar>
      <SideBarMainBox>
        <SideBarMainBox_2>
          <ChatNotification>
            <img
              src={NotificationIcon}
              alt=""
              onClick={() => handleMenu("notifications")}
            />
            {notifications.length > 0 ? (
              <NumberOfNotofications>
                {notifications.length}
              </NumberOfNotofications>
            ) : null}
          </ChatNotification>
          <SideBarBtnBox>
            <img src={PlusIcon} alt="" onClick={() => openMenu("createRoom")} />
          </SideBarBtnBox>
        </SideBarMainBox_2>
        <SideBarMainBox_3>
          <img src={LogoutIcon} alt="" onClick={handleLogout} />
        </SideBarMainBox_3>
      </SideBarMainBox>

      <SearchContainer>
        <img src={SearchIcon} alt="" />
        <SearchChat
          placeholder="Busque uma conversa"
          onChange={(e) => handleSearchChat(e)}
        />
      </SearchContainer>
      <ShortcutContainer>
        {!filteredChat
          ? chatData?.map((chat) => {
              // Limita o texto da última mensagem em 'chat' a 30 caracteres, adicionando "..." se necessário.
              const splitLastMessage =
                chat?.messages[chat.messages.length - 1].text.length > 30
                  ? chat?.messages[chat.messages.length - 1]?.text.substring(
                      0,
                      20
                    ) + "..."
                  : chat?.messages[chat.messages.length - 1].text;

              return (
                <ShortcutToChat
                  key={chat._id}
                  onClick={() => handleSelectedChat(chat._id)}
                >
                  <ChatImageBox>
                    <img src={SplashImage} alt="" />
                  </ChatImageBox>
                  <TitleBoxAndLastmessage>
                    <ChatTitle>{chat.roomName}</ChatTitle>
                    <ChatLastmessage>
                      {chat.messages.length > 0 &&
                      chat.messages[chat.messages.length - 1].text.length < 40
                        ? chat.messages[chat.messages.length - 1].text
                        : splitLastMessage}
                    </ChatLastmessage>
                  </TitleBoxAndLastmessage>
                  <MessageTime>
                    {dayjs(
                      chat.messages.length > 0
                        ? chat.messages[chat.messages.length - 1].timestamp
                        : chat.messages.timestamp
                    ).format("HH:mm")}
                  </MessageTime>
                </ShortcutToChat>
              );
            })
          : filteredChat?.map((chat) => {
              // Limita o texto da última mensagem em 'chat' a 30 caracteres, adicionando "..." se necessário.
              const splitLastMessage =
                chat?.messages[chat.messages.length - 1].text.length > 30
                  ? chat?.messages[chat.messages.length - 1]?.text.substring(
                      0,
                      30
                    ) + "..."
                  : chat?.messages[chat.messages.length - 1].text;

              return (
                <ShortcutToChat
                  key={chat._id}
                  onClick={() => handleSelectedChat(chat._id)}
                >
                  <ChatImageBox>
                    <img src={SplashImage} alt="" />
                  </ChatImageBox>
                  <TitleBoxAndLastmessage>
                    <ChatTitle>{chat.roomName}</ChatTitle>
                    <ChatLastmessage>
                      {chat.messages.length > 0 &&
                      chat.messages[chat.messages.length - 1].text.length < 40
                        ? chat.messages[chat.messages.length - 1].text
                        : splitLastMessage}
                    </ChatLastmessage>
                  </TitleBoxAndLastmessage>
                  <MessageTime>
                    {dayjs(
                      chat.messages.length > 0
                        ? chat.messages[chat.messages.length - 1].timestamp
                        : chat.messages.timestamp
                    ).format("HH:mm")}
                  </MessageTime>
                </ShortcutToChat>
              );
            })}
      </ShortcutContainer>
    </SideBar>
  );
};

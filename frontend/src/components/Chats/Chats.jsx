import React, { useEffect, useState, useRef, memo } from "react";

import { AnimatePresence } from "framer-motion";
import dayjs from "dayjs";

import {
  ChatMessage,
  MessagerSender,
  Message,
  MessageTime,
  CopyContainer,
} from "./ChatsStyle";

import CopyIcon from "../../images/bxs-copy.svg";
import { toast } from "react-toastify";

export const Chats = memo(function Chats({
  handleChatName,
  chatData,
  user,
  currentRoom,
}) {
  const currentChat = chatData.find((chat) => chat._id === currentRoom);
  const messagesEndRef = useRef(null); // Ref para a última mensagem

  const [lastMessageId, setLastMessageId] = useState(null);

  useEffect(() => {
    if (!currentChat) {
      return;
    }
    //atualiza o nome do chat
    handleChatName(currentChat.roomName);
  }, [currentChat]);

  useEffect(() => {
    scrollToBottom(); // Rolar para a última mensagem quando as mensagens mudarem
  }, [chatData]);

  const scrollToBottom = () => {
    // evitando rolagens irrelevantes para o chat atual
    if (messagesEndRef.current) {
      const lastMessage = chatData
        .find((chat) => chat._id === currentRoom)
        ?.messages?.slice(-1)[0];

      if (lastMessage && lastMessage._id !== lastMessageId) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        setLastMessageId(lastMessage._id);
      }
    }
  };

  //copia id da sala, se o adm cicar no icon de cópia da mensagem inicial
  const handleCopy = async (copyMe) => {
    try {
      // eslint-disable-next-line no-undef
      await navigator.clipboard.writeText(copyMe);
      toast.success("Id copiado com sucesso");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  return (
    <>
      {chatData?.map((chat) => {
        return chat?.messages.map((message) => {
          /* Verificando se o remetente da mensagem é o próprio usuário que a enviou, 
          de modo que, assim, seja possível posicionar as mensagens corretamente */

          const isSender = message.sender === user;

          return (
            <AnimatePresence key={message._id}>
              <ChatMessage
                issender={isSender.toString()}
                key={message._id}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.3, 0.5, 0.7, 1],
                  transition: { duration: 1, delay: 0.2 },
                }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
              >
                <MessagerSender issender={isSender.toString()}>
                  {message.sender}
                </MessagerSender>
                <Message>{message.text}</Message>
                {message.copyBtn ? (
                  <CopyContainer>
                    <img
                      src={CopyIcon}
                      alt=""
                      onClick={() => handleCopy(chat._id)}
                    />
                    <MessageTime>
                      {dayjs(message.timestamp).format("HH:mm")}
                    </MessageTime>
                  </CopyContainer>
                ) : (
                  <MessageTime>
                    {dayjs(message.timestamp).format("HH:mm")}
                  </MessageTime>
                )}
              </ChatMessage>
            </AnimatePresence>
          );
        });
      })}
      <div ref={messagesEndRef}></div>
    </>
  );
});

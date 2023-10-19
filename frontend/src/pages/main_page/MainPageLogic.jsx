import { useEffect, useState, useMemo, useCallback } from "react";

import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

const useMainPageLogic = (socket) => {
  const userData = useSelector((state) => state.auth.user);

  const [openHeader, setOpenHeader] = useState(true);

  const [user, setUser] = useState({
    currentUser: userData.name,
    userSocketId: "",
  });
  const [currentChatName, setCurrentChatName] = useState("");

  const [selectedRoom, setSelectedRoom] = useState("");

  const [alerts, setAlerts] = useState([]);

  const [searchChat, setSearchChat] = useState("");
  const [roomRecord, setRoomData] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.connect();

    const handleRoomCreated = (newRoom) => {
      setRoomData((prevRoomData) => [...prevRoomData, newRoom]);
    };

    const handleNewMessage = (data) => {
      const { roomId, newMessage } = data;

      setRoomData((prevRoom) => {
        if (prevRoom) {
          return prevRoom.map((room) => {
            if (roomId === room._id) {
              return {
                ...room,
                messages: [...room.messages, newMessage],
              };
            } else {
              return room;
            }
          });
        } else {
          // Handle the case when prevRoom is undefined
          return [];
        }
      });
    };

    const handleUserJoined = (data) => {
      const { roomId, newMember, welcomeMessage } = data;
      setRoomData((prevRoomData) =>
        prevRoomData.map((room) => {
          if (roomId === room._id) {
            return {
              ...room,
              members: [...room.members, newMember],
              messages: [...room.messages, welcomeMessage],
            };
          } else {
            return room;
          }
        })
      );
    };

    const handleAddNewUser = (newRoom) => {
      setRoomData((prevRoomData) => [...prevRoomData, newRoom]);
    };

    const handleNewNotifications = (newNotificationsData) => {
      setAlerts((prevNotifications) => {
        return [...prevNotifications, newNotificationsData];
      });
    };

    socket.on("roomCreated", handleRoomCreated);

    socket.on("receiveAlert", handleNewNotifications);

    socket.on("requestRejected", handleNewNotifications);

    socket.on("newMessage", handleNewMessage);

    socket.on("requestAccepted", handleAddNewUser);
    socket.on("updateRoom", handleUserJoined);

    return () => {
      socket.off("roomCreated", handleRoomCreated);
      socket.off("receiveAlert", handleNewNotifications);
      socket.off("requestAccepted", handleAddNewUser);
      socket.off("updateRoom", handleUserJoined);
      socket.off("newMessage", handleNewMessage);
      socket.disconnect();
    };
  }, [socket]);

  function generateUserId() {
    return `user_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  }

  // Verifica se o userId já está armazenado em um cookie
  function getUserId() {
    const storedUserId = Cookies.get("userId", {
      expires: 7,
    });
    if (storedUserId) {
      return storedUserId;
    } else {
      const newUserId = generateUserId();
      Cookies.set("userId", newUserId);
      return newUserId;
    }
  }

  useEffect(() => {
    const userId = getUserId();

    const data = {
      userId: userId,
    };

    socket.emit("userOnline", data, (response) => {
      setUser({
        ...user,
        userSocketId: response.socketId,
      });

      // Verifica se não há dados de sala carregados.
      if (!roomData.length) {
        const data = {
          userName: user.currentUser,
          userSocketId: response.socketId,
        };
        socket.emit("getRoomData", data, (response) => {
          if (!Array.isArray(response.data)) {
            return;
          }
          setRoomData(response.data);
        });
      }
    });
  }, []);

  const handleSearchChat = useCallback((search) => {
    setSearchChat(search.target.value);
  }, []);

  // Ordena os registros das salas com base no tempo da última mensagem, do mais recente para o mais antigo.
  const roomData = [...roomRecord]?.sort((room1, room2) => {
    const lastMessageTime1 = room1.messages
      ? room1.messages[room1.messages.length - 1]?.timestamp || 0
      : 0;
    const lastMessageTime2 = room2.messages
      ? room2.messages[room2.messages.length - 1]?.timestamp || 0
      : 0;

    return lastMessageTime2 - lastMessageTime1;
  });

  // Filtra as salas com base na pesquisa de nome da sala, insensível a maiúsculas e minúsculas.
  const filteredChat = useMemo(() => {
    return roomData?.filter(
      (chat) =>
        chat &&
        chat.roomName &&
        chat.roomName
          .toLowerCase()
          .includes(searchChat.toString().toLowerCase())
    );
  }, [roomRecord, searchChat]);

  // Função de tratamento de tecla pressionada que chama 'sendMessage' quando a tecla Enter é pressionada.
  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter") {
        sendMessage();
      }
    },
    [user, message]
  );

  const handleMessageText = useCallback((e) => {
    setMessage(e.target.value);
  }, []);

  const handleCreateRoom = useCallback(
    ({ roomName }) => {
      const { currentUser, userSocketId } = user;

      socket.emit(
        "createRoom",
        currentUser,
        userSocketId,
        roomName,
        (response) => {
          if (!response.success) {
            toast.error(response.error);
          }
          toast.success(response.success);
        }
      );
    },
    [user]
  );

  const handleRequestToJoinRoom = useCallback(
    ({ roomId }) => {
      const { userSocketId: replyId, currentUser: userName } = user;

      socket.emit("requestToJoin", roomId, userName, replyId, (response) => {
        if (!response.success) {
          toast.error(response.error);
        }
        toast.success(response.success);
      });
    },
    [user]
  );

  const handleResponseToRequester = useCallback(
    (request, reply) => {
      const { roomId, userName: recipientName, replyId } = request;

      const { currentUser: senderName } = user;
      socket.emit(
        "replyRequest",
        roomId,
        recipientName,
        senderName,
        replyId,
        reply,
        (response) => {
          if (!response.success) {
            toast.error(response.error);
          }
        }
      );
    },
    [user]
  );

  const handleSelectedChat = useCallback((roomId) => {
    setSelectedRoom(roomId);
    setOpenHeader(false);
  }, []);

  const handleChatName = useCallback((name) => {
    setCurrentChatName(name);
  }, []);

  const sendMessage = useCallback(() => {
    const { currentUser } = user;

    if (message) {
      socket.emit("send message", currentUser, selectedRoom, message);
      setMessage("");
    }
  }, [user, message, selectedRoom]);

  const handleClearingAlerts = useCallback((alertId) => {
    setAlerts((prevRequest) =>
      prevRequest.filter((request) => request._id !== alertId)
    );
  }, []);

  const currentUser = useMemo(() => {
    const { currentUser } = user;
    return currentUser;
  }, [user]);

  return {
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
  };
};

export default useMainPageLogic;

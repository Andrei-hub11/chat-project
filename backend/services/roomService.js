const uuid = require("uuid");

const rooms = [];

const getRooms = () => {
  return rooms;
};

//obtendo dados atualizados de salas do usuario anteriormente armazenadas
const getRoomByUser = (userName, newSocketId) => {
  rooms.forEach((room) => {
    if (room.members.includes(userName)) {
      if (room.roomADM) {
        room.roomADM.forEach((adm) => {
          if (adm.admName === userName) {
            adm.userSocketId = newSocketId;
          }
        });
      }
    }
  });

  const roomRecord = rooms?.filter((room) => {
    return room.members.includes(userName);
  });

  return roomRecord;
};

const createRoom = (userName, userId, roomName) => {
  const id = uuid.v4();
  const firstMessage = {
    _id: uuid.v4(),
    sender: "Server",
    text: `Olá. Este é o id de sua sala: ${id}`,
    copyBtn: true,
    timestamp: Date.now(),
  };

  const newRoom = {
    _id: id,
    roomName: roomName,
    roomADM: [{ admName: userName, userSocketId: userId }],
    members: [userName],
    createdAt: Date.now(),
    messages: [firstMessage],
  };

  rooms.push(newRoom);

  return newRoom;
};

const joinRoom = (userName, roomId) => {
  const roomIndex = rooms?.findIndex((room) => room._id === roomId);

  if (roomIndex === -1) {
    return null;
  }

  const welcomeMessage = {
    _id: uuid.v4(),
    sender: "Server",
    text: "Diga olá a seus amigos",
    timestamp: Date.now(),
  };

  // Crie um novo objeto de quarto baseado no quarto existente
  const newRoom = { ...rooms[roomIndex] };

  // Defina as mensagens do novo quarto apenas com a mensagem de boas-vindas
  newRoom.messages = [welcomeMessage];

  rooms[roomIndex].members.push(userName);
  rooms[roomIndex].messages.push(welcomeMessage);

  //devolvendo dados para o novo membro
  return newRoom;
};

const updateMessages = (userName, roomId, message) => {
  const roomIndex = rooms?.findIndex((room) => room._id === roomId);

  const newMessage = {
    _id: uuid.v4(),
    sender: userName,
    text: message,
    timestamp: Date.now(),
  };

  rooms[roomIndex].messages = [...rooms[roomIndex].messages, newMessage];
  return newMessage;
};

module.exports = {
  createRoom,
  getRooms,
  getRoomByUser,
  joinRoom,
  updateMessages,
};

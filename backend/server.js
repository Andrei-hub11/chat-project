const dotenv = require("dotenv");
const uuid = require("uuid");
const express = require("express");
const cors = require("cors");
const http = require("http");

const app = express();
const roomService = require("./services/roomService");
const socketService = require("./services/socketService");
const { errorHandler } = require("./middleware/errorMiddleware.js");
const connectDB = require("./config/db.js");

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoutes.js"));

app.use(errorHandler);

const server = http.createServer(app); // Cria o servidor HTTP usando o aplicativo Express.js

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  //armazena/atualiza o socket id do usuário, e o devolve ao front, para manipulação adequada
  socket.on("userOnline", ({ userId }, callback) => {
    const userSockets = socketService.getUserSockets();
    const existingUser = userSockets?.find((user) => user.userId === userId);
    if (existingUser) {
      existingUser.socketId = socket.id; // Atualiza o ID do socket

      callback(existingUser);
    } else {
      // Adiciona o novo usuário à lista de usuários
      userSockets.push({ userId: userId, socketId: socket.id });
      callback({ userId: userId, socketId: socket.id });
    }
  });

  /*  devolvendo as salas armazenadas, se houverem, e atualizando socketid de casos 
  em que o usuário é adm de uma sala */
  socket.on("getRoomData", (data, callback) => {
    const { userName, userSocketId } = data;
    if (!userName) {
      callback({ error: "O nome do usuário é necesssário" });
    }
    const payload = roomService.getRoomByUser(userName, userSocketId);

    //devolvendo usuários à sala, em sua nova conexão
    for (const room of payload) {
      socket.join(room._id);
    }

    callback({ data: payload });
  });

  //criando salas
  socket.on("createRoom", (userName, userSocketId, roomName, callback) => {
    if (!userName || !roomName) {
      callback({ error: "O nome do usuário e da sala são necesssários" });
    }

    const roomCreated = roomService.createRoom(
      userName,
      userSocketId,
      roomName
    );

    //adicionando o usuário à sala que criou
    socket.join(roomCreated._id);

    //enviando os dados da sala criada criada ao front
    socket.emit("roomCreated", roomCreated);
    callback({ success: "Sala criada com sucesso!" });
  });

  //pedindo para entrar em uma sala com seu id
  socket.on("requestToJoin", (roomId, userName, replyId, callback) => {
    const rooms = roomService.getRooms();
    const roomRecord = rooms?.find((room) => room._id === roomId);

    if (!roomRecord) {
      callback({ error: `A sala com o id ${roomId} não foi encontrada` });
    }

    //adiciona o solicitante previamente à sala desejada, para evitar conflito com a resposta do adm
    socket.join(roomId);

    const data = {
      _id: uuid.v4(),
      roomId,
      userName,
      replyId,
      alert: `${userName} deseja se juntar a sua sala.`,
      type: "request",
      timestamp: Date.now(),
    };

    //enviando alerta aos adms
    for (const roomName of roomRecord.roomADM) {
      socket.to(roomName.userSocketId).emit("receiveAlert", data);
    }

    callback({
      success: "Solicitação realizada com sucesso! Aguarde uma resposta.",
    });
  });

  //respondendo solitação
  socket.on(
    "replyRequest",
    (roomId, recipientName, senderName, replyId, reply, callback) => {
      if (reply === "reject") {
        const requesterSocket = io.of("/").sockets.get(replyId);

        if (requesterSocket) {
          //remove o usuario previamenete adicionado
          requesterSocket.leave(roomId);
        }
        const data = {
          _id: uuid.v4(),
          alert: `${senderName} recusou o seu pedido.`,
          type: "alert",
          timestamp: Date.now(),
        };
        io.to(replyId).emit("receiveAlert", data);
        return;
      }

      const userRoom = roomService.joinRoom(recipientName, roomId);

      const welcomeMessage = {
        _id: uuid.v4(),
        sender: "Server",
        text: `${recipientName} juntou-se à sala`,
        timestamp: Date.now(),
      };

      const data = {
        roomId,
        newMember: recipientName,
        welcomeMessage,
      };

      //notificando os membros
      io.to(roomId).emit("updateRoom", data);

      //notificando o solicitante
      io.to(replyId).emit("requestAccepted", userRoom);
    }
  );

  //recebendo mensagens
  socket.on("send message", (userName, roomId, message) => {
    const rooms = roomService.getRooms();
    const roomRecord = rooms?.find((room) => room._id === roomId);

    if (!roomRecord) {
      callback({ error: `A sala com o id ${roomId} não foi encontrada` });
    }

    const newMessage = roomService.updateMessages(userName, roomId, message);

    const data = {
      roomId: roomId,
      newMessage: newMessage,
    };

    //devolvendo mensagem à sala de destino
    io.to(roomId).emit("newMessage", data);
  });
});

server.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});

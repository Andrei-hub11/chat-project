const {
  createRoom,
  getRooms,
  getRoomByUser,
  joinRoom,
  updateMessages,
} = require("../services/roomService");

jest.mock("uuid", () => ({
  v4: jest.fn(() => "unique-id"),
}));

describe("Chat Room Functions", () => {
  let rooms = [];

  beforeEach(() => {
    // Antes de todos os testes, cria uma sala válida para uso nos testes

    const createdRoom = createRoom("AdminUser", "AdminUserId", "Sala de Teste");
    roomId = createdRoom._id; // Armazena o ID da sala criada

    rooms.push(createdRoom);
  });

  afterEach(() => {
    rooms = [];
  });

  describe("createRooms function", () => {
    test("createRoom function should create a new room", () => {
      const userName = "adminUser";
      const userId = "adminUserId";
      const roomName = "Test Room";

      const newRoom = createRoom(userName, userId, roomName);

      expect(newRoom._id).toBe("unique-id");
      expect(newRoom.roomName).toBe(roomName);
      expect(newRoom.roomADM).toHaveLength(1);
      expect(newRoom.roomADM[0].admName).toBe(userName);
      expect(newRoom.members).toHaveLength(1);
      expect(newRoom.members[0]).toBe(userName);
      expect(newRoom.messages).toHaveLength(1);
      expect(newRoom.messages[0].sender).toBe("Server");
    });
  });

  describe("getRooms function", () => {
    test("getRooms function should return the list of rooms", () => {
      const roomsList = getRooms();

      expect(roomsList).toEqual(
        expect.arrayContaining([expect.objectContaining(rooms[0])])
      );
    });
  });

  describe("joinRoom function", () => {
    test("joinRoom function should add a user to an existing room", () => {
      const userName = "newUser";

      const joinedRoom = joinRoom(userName, roomId);

      expect(joinedRoom.members).toContain(userName);
      expect(joinedRoom.messages).toHaveLength(1);
    });

    test("should return null when trying to join a non-existent room", () => {
      const userName = "newUser";
      const joinedRoom = joinRoom(userName, "nonexistent-room-id");

      expect(joinedRoom).toBe(null);
    });
  });

  describe("updateMessages function", () => {
    test("updateMessages function should add a new message to a room", () => {
      const userName = "user1";

      const messageText = "Hello, World!";

      const newMessage = updateMessages(userName, roomId, messageText);

      expect(newMessage._id).toBe("unique-id");
      expect(newMessage.sender).toBe(userName);
      expect(newMessage.text).toBe(messageText);
      expect(rooms[0].messages).toHaveLength(1);
    });

    test("should return null when trying to add a message to a non-existent room", () => {
      const userName = "user1";
      const messageText = "Hello, World!";
      const newMessage = updateMessages(
        userName,
        "nonexistent-room-id",
        messageText
      );

      expect(newMessage).toBe(null);
    });
  });

  describe("getRoomByUser function", () => {
    test("update socket ID for user's admin role", () => {
      const expected = {
        roomName: "Sala de Teste",
        roomADM: [{ admName: "AdminUser", userSocketId: "NewSocketId" }],
        messages: [
          {
            _id: expect.any(String),
            sender: "Server",
            text: expect.any(String),
            copyBtn: true,
            timestamp: expect.any(Number),
          },
        ],
      };

      const updatedRooms = getRoomByUser("AdminUser", "NewSocketId");
      expect(updatedRooms).toEqual(
        expect.arrayContaining([expect.objectContaining(expected)])
      );
    });
  });
});

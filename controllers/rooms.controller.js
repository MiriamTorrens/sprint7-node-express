const rooms = require("../data/rooms.json");

exports.roomsList = (req, res) => {
  return res.json(rooms);
};
exports.addRoom = (req, res) => {
  rooms.push(req.body);
  return res.json({ success: true, message: "Room successfully added" });
};
exports.getRoom = (req, res) => {
  const room = rooms.find((r) => r.id === req.params.id);
  return !room
    ? res.status(404).json({ success: false, message: "Room not found" })
    : res.json(room);
};
exports.deleteRoom = (req, res) => {
  const index = rooms.findIndex((r) => r.id === req.params.id);
  rooms.splice(index, 1);
  return index < 0
    ? res.status(404).json({ success: false, message: "Room not found" })
    : res.json({ success: true, message: "Room successfully deleted" });
};
exports.updateRoom = (req, res) => {
  rooms.forEach((room, index) => {
    if (room.id === req.params.id) {
      room = room[index];
      return !room[index]
        ? res.status(404).json({ success: false, message: "Booking not found" })
        : (rooms[index] = req.body);
    }
  });
  return res.json({ success: true, message: "Booking successfully updated" });
};

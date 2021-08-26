const gamePieces = {
  0: { shape: [[0]], color: "255,255,255" },
  I: {
    shape: [
      [0, "I", 0, 0],
      [0, "I", 0, 0],
      [0, "I", 0, 0],
      [0, "I", 0, 0],
    ],
    color: "167, 199, 231",
  },
  J: {
    shape: [
      [0, "J", 0],
      [0, "J", 0],
      ["J", "J", 0],
    ],
    color: "193, 225, 193",
  },
  L: {
    shape: [
      [0, "L", 0],
      [0, "L", 0],
      [0, "L", "L"],
    ],
    color: "253, 253, 150",
  },
  O: {
    shape: [
      ["O", "O"],
      ["O", "O"],
    ],
    color: "250, 200, 152",
  },
  S: {
    shape: [
      [0, "S", "S"],
      ["S", "S", 0],
      [0, 0, 0],
    ],
    color: "250, 160, 160",
  },
  Z: {
    shape: [
      ["Z", "Z", 0],
      [0, "Z", "Z"],
      [0, 0, 0],
    ],
    color: "203, 195, 227",
  },
  T: {
    shape: [
      [0, "T", 0],
      ["T", "T", "T"],
      [0, 0, 0],
    ],
    color: "177, 144, 127",
  },
};

export function randomPiece() {
  const bank = "IJLOSZT";
  const random = bank[Math.floor(Math.random() * bank.length)];

  return gamePieces[random];
}

export default gamePieces;

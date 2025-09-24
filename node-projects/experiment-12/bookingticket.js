
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
const TOTAL_SEATS = 10;
const LOCK_TIMEOUT = 60 * 1000;

let seats = [];
for (let i = 1; i <= TOTAL_SEATS; i++) {
  seats.push({
    id: i,
    status: "available", 
    lockedBy: null,
    lockExpiry: null,
  });
}
function releaseExpiredLocks() {
  const now = Date.now();
  seats.forEach((seat) => {
    if (seat.status === "locked" && seat.lockExpiry < now) {
      seat.status = "available";
      seat.lockedBy = null;
      seat.lockExpiry = null;
    }
  });
}

app.get("/seats", (req, res) => {
  releaseExpiredLocks();
  res.json(seats);
});
app.post("/lock", (req, res) => {
  const { seatId, userId } = req.body;
  releaseExpiredLocks();

  const seat = seats.find((s) => s.id === seatId);
  if (!seat) {
    return res.status(404).json({ error: "Seat not found" });
  }

  if (seat.status === "booked") {
    return res.status(400).json({ error: "Seat already booked" });
  }

  if (seat.status === "locked" && seat.lockedBy !== userId) {
    return res.status(400).json({ error: "Seat is locked by another user" });
  }

  seat.status = "locked";
  seat.lockedBy = userId;
  seat.lockExpiry = Date.now() + LOCK_TIMEOUT;

  res.json({ message: "Seat locked successfully", seat });
});
app.post("/confirm", (req, res) => {
  const { seatId, userId } = req.body;
  releaseExpiredLocks();

  const seat = seats.find((s) => s.id === seatId);
  if (!seat) {
    return res.status(404).json({ error: "Seat not found" });
  }

  if (seat.status !== "locked" || seat.lockedBy !== userId) {
    return res
      .status(400)
      .json({ error: "Seat not locked by you or lock expired" });
  }

  seat.status = "booked";
  seat.lockedBy = null;
  seat.lockExpiry = null;

  res.json({ message: "Booking confirmed", seat });
});
app.post("/unlock", (req, res) => {
  const { seatId } = req.body;

  const seat = seats.find((s) => s.id === seatId);
  if (!seat) {
    return res.status(404).json({ error: "Seat not found" });
  }

  seat.status = "available";
  seat.lockedBy = null;
  seat.lockExpiry = null;

  res.json({ message: "Seat unlocked successfully", seat });
});

app.listen(PORT, () => {
  console.log(`🚀 Ticket Booking Server running at http://localhost:${PORT}`);
});

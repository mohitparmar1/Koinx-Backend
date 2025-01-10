import express from "express";
import dbConnect from "./config/dbConnect.js";
import fetchCryptoData from "./jobs/fetchCryptoData.js";
import userRoutes from "./routes/userRoutes.js";
import cron from "node-cron";

const app = express();
const PORT = process.env.PORT;

dbConnect();

app.use(express.json());
app.use("/", userRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "server working fine",
  });
});

cron.schedule("0 */2 * * *", fetchCryptoData);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
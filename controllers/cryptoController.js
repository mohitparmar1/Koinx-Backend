import Crypto from "../models/cryptoModel.js";

const getStats = async (req, res) => {
  try {
    const { coin } = req.query;

    if (!coin) return res.status(400).json({ error: "Coin is required." });

    const latestData = await Crypto.findOne({ coin }).sort({
      timestamp: -1,
    });

    if (!latestData)
      return res
        .status(404)
        .json({ error: "No data found for the requested coin." });

    res.json({
      price: latestData.price,
      marketCap: latestData.marketCap,
      "24hChange": latestData.change24h,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

export { getStats };

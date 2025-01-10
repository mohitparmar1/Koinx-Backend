import Crypto from "../models/cryptoModel.js";

// controller for /stats endpoint
const getStats = async (req, res) => {
  try {
    const { coin } = req.query;

    const allowedCoins = ["bitcoin", "ethereum", "matic-network"];

    if (!coin || !allowedCoins.includes(coin))
      return res.status(400).json({ error: "Coin is required." });

    // get the latest data for the requested coin
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

// controller for /deviation endpoint
const getDeviation = async (req, res) => {
  const { coin } = req.query;

  const allowedCoins = ["bitcoin", "ethereum", "matic-network"];

  // check if coin is allowed
  if (!coin || !allowedCoins.includes(coin))
    return res.status(400).json({ error: "Invalid or missing coin parameter" });

  try {
    // get last 100 records for the requested coin
    const data = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(100);

    if (data.length === 0)
      return res.status(404).json({ error: "no records found" });

    // extract prices from the data
    const prices = data.map((record) => record.price);

    // calculate mean
    const mean = prices.reduce((acc, price) => acc + price, 0) / prices.length;

    // calculate variance
    const variance =
      prices.reduce((acc, price) => acc + Math.pow(price - mean, 2), 0) /
      prices.length;

    const deviation = Math.sqrt(variance);

    res.json({
      deviation: deviation.toFixed(2),
      message: "Deviation calculated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while calculating deviation." });
  }
};

export { getStats, getDeviation };

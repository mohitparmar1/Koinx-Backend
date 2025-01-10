import axios from "axios";
import Crypto from "../models/cryptoModel.js";
import dotevn from "dotenv";
dotevn.config();

const fetchCryptoData = async () => {
  const base_url = process.env.COINGECKO_API_BASE_URL;
  console.log(base_url);
  try {
    const coins = ["bitcoin", "ethereum", "matic-network"];
    const response = await axios.get(
      `${base_url}/simple/price?ids=bitcoin,matic-network,ethereum&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`
    );

    const { bitcoin, ethereum, "matic-network": matic } = response.data;
    console.log(response.data);

    const cryptoData = [
      {
        coin: "bitcoin",
        price: bitcoin.usd,
        marketCap: bitcoin.usd_market_cap,
        change24h: bitcoin.usd_24h_change,
      },
      {
        coin: "ethereum",
        price: ethereum.usd,
        marketCap: ethereum.usd_market_cap,
        change24h: ethereum.usd_24h_change,
      },
      {
        coin: "matic-network",
        price: matic.usd,
        marketCap: matic.usd_market_cap,
        change24h: matic.usd_24h_change,
        change24h: matic.usd_24h_change,
      },
    ];

    await Crypto.insertMany(cryptoData);
    console.log("Crypto data fetched and stored successfully.");
  } catch (error) {
    console.error(error);
  }
};

export default fetchCryptoData;

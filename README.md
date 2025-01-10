# Koinx Assignment

---

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [API Endpoints](#api-endpoints)
  - [/stats](#stats)
  - [/deviation](#deviation)
---

## Features
- Fetches current price, market cap, and 24-hour change for Bitcoin, Matic, and Ethereum.
- Stores fetched data in a MongoDB database.
- Provides an API to retrieve the latest cryptocurrency stats.
- Calculates the standard deviation of prices for the last 100 records.

---

## Technologies Used
- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing cryptocurrency data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **Axios**: Promise-based HTTP client for making API requests.
- **Node-Cron**: Library for scheduling tasks in Node.js.
- **dotenv**: Module to load environment variables from a `.env` file.

---

## Endpoints 

[/stats?coin=x] : fetch data for coin 'x'

[/stats?coin=x] : calculate deviation for coin 'x'





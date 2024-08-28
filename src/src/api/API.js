import PlayerList from "../class/PlayerList";
import axios from "axios";
import dotenv from "dotenv";

// require("dotenv").config();

class API {
  constructor() {
    this.jsonBinUrl = "https://api.jsonbin.io/v3/b/66cec744acd3cb34a87a9574";
    this.apiKey =
      "$2a$10$kiqhPkHwID.cs6ID65182.Fft9GHpRBJKmRr1bwqH3rF7VuqcANdS";
  }

  async request() {
    try {
      const response = await axios.get(this.jsonBinUrl, {
        headers: {
          "X-Access-Key": this.apiKey,
        },
      });

      const parsedData = response.data.record;
      // console.log("Data fetched from JSONBin:", parsedData);
      const playerList = new PlayerList(parsedData);
      return playerList;
    } catch (error) {
      console.error("Error fetching data from JSONBin:", error);
      return new PlayerList();
    }
  }

  async post(newData) {
    try {
      const response = await axios.put(this.jsonBinUrl, newData, {
        headers: {
          "Content-Type": "application/json",
          "X-Access-Key": this.apiKey,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error saving data to JSONBin:", error);
      throw new Error("Failed to save data to JSONBin.");
    }
  }
}

export default API;

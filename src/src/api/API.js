import PlayerList from "../class/PlayerList";

class API {
  constructor() {
    this.dataKey = "DotConnectPlayerData";
  }

  request() {
    return new Promise((resolve, reject) => {
      const data = localStorage.getItem(this.dataKey);
      if (data) {
        try {
          const parsedData = JSON.parse(data);
          const playerList = new PlayerList(parsedData);
          resolve(playerList);
        } catch (error) {
          reject(new Error("Failed to parse data from localStorage."));
        }
      } else {
        resolve(new PlayerList());
      }
    });
  }

  post(newData) {
    return new Promise((resolve, reject) => {
      try {
        localStorage.setItem(this.dataKey, JSON.stringify(newData));
        resolve(newData);
      } catch (error) {
        reject(new Error("Failed to save data to localStorage."));
      }
    });
  }
}

export default API;

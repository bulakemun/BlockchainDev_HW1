import * as fs from "fs";

fs.readFile("data.json", (error, data) => {
    if (error) {
      console.error(error);
      throw error;
    }
    const user = JSON.parse(data);
  
    console.log(user);
  });
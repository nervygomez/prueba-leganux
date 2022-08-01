const mongoose = require("mongoose");


const dbConnection = async () => {
    try {
      await mongoose.connect(process.env.MONGODB);
  
      console.log("Database connected");

    } catch (error) {
      console.error(error);
      throw new Error("Error al iniciar la BD");
    }
  };


module.exports = {
    dbConnection
  };
  
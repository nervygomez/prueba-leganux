const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser')
const { dbConnection } = require("../config/db.config");
class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;


         // Database connection
         this.connectDatabase();

        // Middlewares
        this.middlewares();

        // Applications route
        this.app.use("/api", require("../routes"));

    }

    async connectDatabase() {
        await dbConnection();
    }

    middlewares() {

        // Public directory
        this.app.use(express.static('public'));

        // CORS
        this.app.use(cors({ origin: "*" }));
        // parse application/x-www-form-urlencoded
        this.app.use(bodyParser.urlencoded({ extended: false }))

        // parse application/json
        this.app.use(bodyParser.json())


    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Server is running on port", this.port);
        });
    }
}

module.exports = Server;

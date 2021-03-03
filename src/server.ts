import express = require('express');
import { FlightsController } from "./controllers/FlightsController";
import { VARS, PORT } from "./config";

const app: express.Application = express();

const controller = new FlightsController();


app.get('/', controller.get.bind(controller));

app.listen(PORT, function () {
    console.log(`Listening to port : ${PORT}`)
});



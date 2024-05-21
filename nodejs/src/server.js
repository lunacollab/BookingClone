import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from './config/conectDB';
import cors from 'cors';

require('dotenv').config(); 


let app = express();
app.use(cors({ origin: true }));


//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({limit:'100mb'}));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true, parameterLimit: 50000 }))
viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 6060;  

app.listen(port, () => {
    console.log("Backend Nodejs is running on the port: " + port);
})
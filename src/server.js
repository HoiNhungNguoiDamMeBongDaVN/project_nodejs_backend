import express from "express";
import viewEngine from './config/viewEngines'
import initRoute from "./router/web";
import bodyParser from "body-parser";
import connectDB from './config/connectDB';
import cors from 'cors';



require('dotenv').config();

const app = express();
app.use(cors({
  origin: true,
  credentials: true,
}))
const port = process.env.PORT || 8080;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

//setup view engine
viewEngine(app);

//init router
initRoute(app);

connectDB();

try {
  app.listen(port, () => {
    console.log("Server started with port ", port);
  });
} catch (error) {
  console.error("Error starting the server:", error);
}

// Add a catch block to handle promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise);
  // Handle the rejection here, such as logging or throwing an error
});

import express from 'express';
import { fileURLToPath } from 'url';
import http from 'http';
import path from 'path';
import cors from 'cors';
import { Server as SocketServer } from 'socket.io';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mailRoutes from './src/routes/mailRoutes.js';
dotenv.config();
/* ================= Create Instance of Server =========== */
const app = express();
/* ================= Start Server on PORT =============== */
const PORT = process.env.PORT;
/* ================= Database Connection Url =============== */
const DATABASE_URL = process.env.DATABASE_URL;



/*
Cross-origin resource sharing (CORS) is a mechanism for integrating applications. 
CORS defines a way for client web applications that are loaded in one domain to 
interact with resources in a different domain
*/
/* ========= Cross-origin resource sharing (CORS) ========== */
app.use(cors());


/* ============== For JSON data =========== */
app.use(express.json());


/*  ================= Increase payload size limit =========== */
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


/* =================  Setup Live/Local Url of uploads =========== */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


/* ================ Serve static files from the 'uploads' directory ================= */
const uploadsDirectory = path.join(__dirname, 'src', 'public', 'uploads');


const staticFilesDirectory = path.join(__dirname, 'src', 'static');

// Serve static files from the specified directory
app.use('/static', express.static(staticFilesDirectory));

/** ================= Serve static files from the 'uploads' directory ================= **/
app.use('/uploads', express.static(uploadsDirectory));


/* ================= CORS =============== */
app.use(cors());


/* ================= Middlewares =============== */
app.use(express.json());



/* ================= Routes ================= */
app.use("/api/v1/mail", mailRoutes);


import errorHandler from './src/middlewares/errorHandler.js';
app.use(errorHandler);




/* ================= Start Server on PORT =============== */
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);

});

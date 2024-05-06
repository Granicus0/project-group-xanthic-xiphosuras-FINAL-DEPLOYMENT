import express from "express";
import cors from "cors";
import mongoose from 'mongoose'
import userRoutes from './routes/user.js'
import modelRoutes from './routes/model.js';
import { createServer } from 'http'
import { Server } from 'socket.io'

const PORT = process.env.PORT || 5050;

const app = express();
// We are creating a web socket server here. This is how we are going to get live updates from the model training APIs. If you don't know 
// what a WebSocket is you can visit this link: https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
const server = createServer(app);
// Create a socket input/output object.
const io = new Server(server, {
  // It's very important you leave this. Our React front end *cannot* communicate with the server as it's hosted on a different origin which violates CORS
  // policies. If you don't know what CORS is you can visit this link: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
  // This basically allows the frontend to bypass CORS for GET and POST requests (remember the front-end is hosted on port 5173, and our backend server is hosted on port 5050)
    cors: {
        origin: process.env.FRONTEND_ORIGIN, 
        methods: ["GET", "POST"]
    }
});

app.use(cors());

// Allows us to grab data from request objects (express will parse request objects into a JSON)
app.use(express.json());

app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.set({
      'Access-Control-Allow-Origin': process.env.FRONTEND_ORIGIN,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',  
      'Access-Control-Allow-Headers': 'Content-Type, Authorization' 
    });
    return res.sendStatus(200); 
  }

  next(); 
});

// These are our *BASE* API routes. 
app.use('/api/user', userRoutes)
app.use('/api/models', modelRoutes(io));


// Connect to MongoDB via Mongoose
mongoose.connect(process.env.ATLAS_URI)
  // Only after connecting do we start listening for server requests
  .then(() => {
    // We are using our SOCKET SERVER to connect to the database.
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  // Catch any errors
  .catch((error) => {
    console.log(error)
  })

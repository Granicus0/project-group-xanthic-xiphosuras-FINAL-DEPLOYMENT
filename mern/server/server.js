import express from "express";
import cors from "cors";
import mongoose from 'mongoose'
import userRoutes from './routes/user.js'
import modelRoutes from './routes/model.js';
import { createServer } from 'http'
import { Server } from 'socket.io'

const PORT = process.env.PORT || 5050;

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", 
        methods: ["GET", "POST"]
    }
});

app.use(cors());

// Allows us to grab data from request objects (express will parse request objects into a JSON)
app.use(express.json());

app.use('/api/user', userRoutes)
app.use('/api/models', modelRoutes(io));


// Connect to MongoDB via Mongoose
mongoose.connect(process.env.ATLAS_URI)
  // Only after connecting do we start listening for server requests
  .then(() => {

    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  // Catch any errors
  .catch((error) => {
    console.log(error)
  })

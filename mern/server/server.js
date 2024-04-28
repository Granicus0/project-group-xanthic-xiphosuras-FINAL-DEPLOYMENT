import express from "express";
import cors from "cors";
import mongoose from 'mongoose'

import userRoutes from './routes/user.js'
import modelRoutes from './routes/model.js';

const PORT = process.env.PORT || 5050;

// Create our express application.
const app = express();

app.use(cors());

// Allows us to grab data from request objects (express will parse request objects into a JSON)
app.use(express.json());

app.use('/api/user', userRoutes)
app.use('/api/models', modelRoutes);

// Connect to MongoDB via Mongoose
mongoose.connect(process.env.ATLAS_URI)
// Only after connecting do we start listening for server requests
  .then(() => {
    // start the Express server
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
// Catch any errors
  .catch((error) => {
    console.log(error)
  })


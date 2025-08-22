import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import activityRoutes from './routes/activityRoute.js';
import chatRoutes from './routes/chatRoute.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

const PORT = process.env.PORT || 3000;

app.use("/api/v1/activities", activityRoutes);
app.use("/api/v1/chatbot", chatRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

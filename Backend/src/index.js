import express from express;
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

const PORT = process.env.PORT || 3000;

app.use("/api/activities", activityRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

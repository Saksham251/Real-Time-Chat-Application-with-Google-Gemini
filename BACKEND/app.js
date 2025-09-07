import express, { urlencoded } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connect from "./db/mongodb.js";
import cors from "cors";
import userRoutes from './routes/user.routes.js';
import projectRoutes from './routes/project.routes.js';
// import aiRoutes from './routes/ai.routes.js';
const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(cookieParser());

connect();


app.use('/users', userRoutes);
app.use('/projects', projectRoutes);
// app.use("/ai", aiRoutes);

export default app;
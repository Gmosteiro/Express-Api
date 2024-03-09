// src/app.ts

import express from "express";
import { validateUser } from "./middleware/validation";
import userRoutes from "./routes/userRoutes";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/users", validateUser, userRoutes);



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});






import express from "express";
import pocRoutes from "./routes/pocRoutes.js";

const app = express();
app.use(express.json());

app.use(pocRoutes);

app.listen(4000, ()=>{
    console.log("Server running in port 4000");
});
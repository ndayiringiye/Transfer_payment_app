import express from "express";
import dotenv from "dotenv";
import moneyRoute from "./routes/transferRoutes.js"
import { connectdb } from "./Config/db.js";
dotenv.config()
const app = express();
app.use(express.json())
app.use("/money", moneyRoute)

const PORT = process.env.PORT || 5000;
app.get("/", (req , res) =>{
    res.send("tuzabigeraho hamwe nimana")
});

app.listen(PORT, async () =>{
    await connectdb();
    console.log(`server is running on port ${PORT}`)
})
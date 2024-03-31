import connecttomongoose from "./db.js";
import express from "express";
import authenticate from "./routes/auth.js";
import notesfunc from "./routes/notes.js";
import bodyParser from "body-parser";
import cors from "cors";
connecttomongoose(); 
const app = express();
app.use(cors());
const port = 5000;




app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

// app.get("/",(req,res)=>{
//     res.send("hello world!");
// });

app.use("/api/auth",authenticate);
app.use("/api/notes",notesfunc);

app.listen(port,()=>{
    console.log("server running on port "+port);
});


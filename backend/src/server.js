import express from "express";
import notesrouter from "./routes/noteroute.js";
import credensrouter from "./routes/credenroute.js";
import poolsrouter from "./routes/poolroute.js";
import reviewsrouter from "./routes/reviewroute.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import ratelimiter from "./middleware/Ratelimiter.js";
import cors from "cors";
import path from "path";

const PORT = process.env.PORT || 5001;
dotenv.config();
const app = express();

// MIDDLEWARE
if(process.env.NODE_ENV === "production")  //CHANGED FOR DEPLOY
  {
     app.use(cors({
     origin:"http://localhost:5173", 
     }));
  }

app.use(express.json());
app.use(ratelimiter);

/*app.use((req, res, next) =>{
     console.log(`THE REQ METHOD IS "${req.method}" AND REQ URL IS "${req.url}"`);
     next();
});*/


app.use("/api/notes",notesrouter);
app.use("/api/credens",credensrouter);
app.use("/api/pools",poolsrouter);
app.use("/api/reviews",reviewsrouter);

//FOR DEPLOYMENT
  const __dirname = path.resolve();
  if(process.env.NODE_ENV === "production")
  {
      app.use(express.static(path.join(__dirname,"../frontend/dist")))
      app.get("*",(req, res) => {
      res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
      })
  }
  
  
//FOR DEPLOYMENT

connectDB().then(() => {
    app.listen(PORT,() => {
    console.log('listening on ',PORT);
});
});


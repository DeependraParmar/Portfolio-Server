import { config } from "dotenv";
import express from "express";
import { connectDB } from "./libs/connectDB.js";
import requestIp from "request-ip";
import { ipMiddleware } from "./middleware.js";
import Request from "./models/Request.js";
import Like from "./models/Like.js";
import cors from "cors";

const app = express();

config({
    path: "./config/config.env"
})

connectDB();
app.use(requestIp.mw());

app.use(cors({
    origin: [process.env.PRIMARY_FRONTEND_URL, process.env.LOCAL_FRONTEND_URL],
    credentials: false,
}))

app.get("/add-request", ipMiddleware , async(req, res) => {
    try{
        const { ip } = req;

        const doIpExist = await Request.findOne({ ip });
        
        if (!doIpExist) {
            await Request.create({ ip });
        }
        
        const views = await Request.countDocuments({});

        return res.json({
            success: true,
            message: "IP Recorded Successfully",
            views
        })
    }
    catch(error){
        console.log(error);
    }
});

app.get("/like", ipMiddleware, async(req, res) => {
    try{
        const { ip } = req;
        const isLiked = await Like.findOne({ ip });
        
        if (!isLiked) {
            await Like.create({ ip });
        }

        const totalLikes = await Like.countDocuments({});

        return res.json({
            success: true,
            message: "Glad you liked it. 😍",
            likes: totalLikes
        })
    }
    catch(error){
        console.log(error);
    }
});

app.get("/dislike", ipMiddleware, async(req, res) => {
    try{
        const { ip } = req;
        const isLiked = await Like.findOne({ ip });
        
        if (isLiked) {
            await Like.findOneAndDelete({ _id: isLiked._id });
        }

        const totalLikes = await Like.countDocuments({});
        
        return res.json({
            success: true,
            message: "Sad to see you go. 😞",
            likes: totalLikes
        })
    }
    catch(error){
        console.log(error);
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server up at port: ${process.env.PORT}`);
});
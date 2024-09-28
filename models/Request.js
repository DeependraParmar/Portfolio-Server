import mongoose from "mongoose";

const schema = new mongoose.Schema({
    ip: {
        type: String,
        unique: true,
    }
});

const Request = new mongoose.model("Request", schema);
export default Request;
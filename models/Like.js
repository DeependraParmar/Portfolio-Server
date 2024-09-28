import mongoose from "mongoose";

const schema = new mongoose.Schema({
    ip : {
        type: String,
        unique: true,
    }
});

const Like = mongoose.model("Like", schema);
export default Like;
import mongoose from "mongoose";

const url = "mongodb://localhost:27017";

const connecttomongoose = ()=>{
    mongoose.connect(url);
    console.log("connectd to mongoose successfully");
}

export default connecttomongoose;
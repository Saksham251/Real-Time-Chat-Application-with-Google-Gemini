import mongoose from "mongoose";

function connect(){
    mongoose.connect(process.env.MONGODB_URL,{dbName:"CHAT_APP_DB"})
    .then(()=>{
        console.log("Connected to MongoDB");
    })
    .catch((err)=>{
        console.log(err);
    });
}

export default connect;
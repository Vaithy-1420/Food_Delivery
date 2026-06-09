import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb://vaitheeswaripavi3007_db_user:8056374786@ac-ij1d0jh-shard-00-00.vkujw7f.mongodb.net:27017,ac-ij1d0jh-shard-00-01.vkujw7f.mongodb.net:27017,ac-ij1d0jh-shard-00-02.vkujw7f.mongodb.net:27017/food-del?ssl=true&replicaSet=atlas-vtzjk2-shard-0&authSource=admin&appName=Cluster0')
    .then(() => console.log("DB Connected"));
} 


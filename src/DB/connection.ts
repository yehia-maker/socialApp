import mongoose from "mongoose";

export function dbConnection(){
    mongoose.connect('mongodb://127.0.0.1:27017/socialApp')
    .then(()=>{
        console.log('db connected succesfully');
        
    }).catch(()=>{
        console.log('failed to connect to db');
        
    })
}
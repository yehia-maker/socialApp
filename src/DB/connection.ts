import mongoose from "mongoose";

export function dbConnection(){
mongoose.connect('mongodb://127.0.0.1:27017/socialApp2')
.then(()=>{
    console.log('db connected successfuly');   
}).catch(()=>{
    console.log('errror conecting to db');  
})
}


import express from 'express'
import { bootstrap } from './app.controller';
const app = express()
const port = 3000
app.listen(port,()=>{
    console.log('server is running on port',port);  
})
bootstrap(express,app)

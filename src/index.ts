//
import express from 'express'
import { Bootstrap } from './app.controller';
const app = express()
const port = 3000
app.listen(port,()=>{
    console.log('server is running on port ',port);
})
Bootstrap(app,express)
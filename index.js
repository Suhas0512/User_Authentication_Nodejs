const express=require('express')
const setupDB=require('./config/database')
const router=require('./config/routes')
const {messagesRouter} = require('./app/controllers/MessageControllers')

const app=express()
const port=3040
app.use(express.json())
app.use('/users',router)
app.use('/messages', messagesRouter)
setupDB()

app.listen(port,()=>{
    console.log('listening on port',port)
})
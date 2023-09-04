const express=require('express')
const db=require('./config/dbconfing')
const cookieparser=require('cookie-parser')
const cors=require('cors');
const app=express();
const router=require('./routes/router');
require('dotenv').config();
const PORT=process.env.PORT || 3000;

app.use(express.json());
app.use(cookieparser());
app.use(cors({
  origin:'*',
  credentials:true
}));
app.use('/api/v1',router);

db.query('SELECT 1').then(()=>{
  console.log("Db connected successfully")
  app.listen(PORT,()=>{
    console.log(`Server started on port number ${PORT}`)
  })
}).catch((err)=>{
    console.log("Error while connecting db","=>",err)
})



app.get("/",(req,res)=>{
  res.send("Server is running")
})
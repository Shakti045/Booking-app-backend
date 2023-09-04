const db=require('../../config/dbconfing');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
require('dotenv').config();

exports.login=async (req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(404).json({
                Success:false,
                Message:"Invalid request"
            })
        }
        const [[user]]=await db.query('SELECT password,email,id FROM user WHERE email=?',[email]);
        if(!user){
            return res.status(404).json({
                Success:false,
                Message:"You have no account with us"
            })
        }
        const passwordmatched=await bcrypt.compare(password,user.password)
        if(!passwordmatched){
            return res.status(404).json({
                Success:false,
                Message:'Password incorrect'
            })
        }
        const payload={
            id:user?.id,
            email:user?.email,
        }
        const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"48h"})
        const options={
            httpOnly:true,
            expires:new Date(Date.now()+2*24*60*60*60*1000)
        }
        res.cookie('token',token,options).status(200).json({
            Success:true,
            Message:"Login successfull",
            Token:token
        })
    } catch (error) {
        console.log("Error while login","=>",error);
        return res.status(500).json({
            Success:false,
            Message:"Something went wrong please try again"
        })
    }
}
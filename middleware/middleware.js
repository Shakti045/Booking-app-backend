const Jwt=require('jsonwebtoken')
require('dotenv').config();

exports.
checkauth=(req,res,next)=>{
  try {
    const token = req?.header("Authorization")?.replace("Bearer ", "") || req.body.token || req.cookies.token;
    if(!token){
        return res.status(404).json({
            Success:false,
            Message:"Unauthorised access"
        })
    }
    const decoded=Jwt.decode(token);
    const exppirationtime=decoded.exp;
    const currentTime = Math.floor(Date.now() / 1000)
     if(currentTime>exppirationtime){
        return res.status(404).json({
            Success:false,
            Message:"Session expired kindly relogin"
        })
     }

    const user=Jwt.verify(token,process.env.JWT_SECRET);
    req.user=user;
    next();
  } catch (error) {
    console.log("Error while verifying token","=>",error);
    return res.status(500).json({
      Success:false,
      Message:"Error while verifying token"
    })
  }
}
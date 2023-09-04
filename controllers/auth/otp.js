const db=require('../../config/dbconfing');
const sendmail=require('../../utils/email');
const otpgenerator=require('otp-generator');

exports.sendotp=async (req,res)=>{
  try{
   const {email}=req.body;
   if(!email){
    return res.status(404).json({
        Success:false,
        Message:"Invalid request"
     })
   }
    const [userexists]=await db.query('SELECT email FROM user WHERE email=?',[email]);
    
    if(userexists.length>0){
        return res.status(404).json({
            Success:false,
            Message:'User already exists kindly login'
        })
    }

    const otp=otpgenerator.generate(6,{
        lowerCaseAlphabets:false,
        upperCaseAlphabets:false,
        specialChars:false,
        digits:true
    })
    await db.query('INSERT INTO otp (otp,email) VALUES (?,?)',[otp,email]);
    await sendmail(email,'Otp to validate email id',`<p>Your otp is ${otp}</p>`)
    return res.status(200).json({
        Success:true,
        Message:"Otp sent to emailid",
        Otp:otp
    })
  }catch(err){
    console.log("Error while sending otp","=>",err);
    return  res.status(500).json({
        Success:false,
        Message:"Error while sending otp"
    })
  }
}
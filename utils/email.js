const nodemailer=require('nodemailer');
require('dotenv').config();
const transporter=nodemailer.createTransport({
    host:'smtp.gmail.com',
    auth:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASS
    }
})


const sendmail=async (
    emailid,subject,body
)=>{
    try{
      await transporter.sendMail({
        from:'Booking made easy',
        to:emailid,
        subject:subject,
        html:body
      })
    }catch(err){
        console.log("Error while sending mail","=>",err);
        throw new Error(err);
    }
}

module.exports=sendmail;
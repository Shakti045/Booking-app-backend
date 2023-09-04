const db=require('../../config/dbconfing');
const bcrypt=require('bcrypt');

exports.signup=async (req,res)=>{
    try {
        const {firstname,lastname,email,password,otp}=req.body;
        if(!firstname || !lastname || !email || !password || !otp){
            return res.status(404).json({
                Success:false,
                Message:"Invalid request"
            })
        }
        const [[recentotp]]=await db.query('SELECT * FROM otp WHERE email=? ORDER BY createdat DESC LIMIT 1',[email])
        recentotp?.createdat.setMilliseconds(recentotp?.createdat.getMilliseconds()+5*60*1000);
        if(!(recentotp?.createdat>Date.now())){
            return res.status(404).json({
                Success:false,
                Message:"Otp expired please retry again"
            })
        }
        if(recentotp?.otp!==otp){
            return res.status(404).json({
                Success:false,
                Message:"Invalid otp"
            })
        }
        const hashedpassword=await bcrypt.hash(password,10);
        const data={
            firstname:firstname,
            lastname:lastname,
            profileimage:`https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastname}`,
            email:email,
            password:hashedpassword
        }
        await db.query('INSERT INTO user SET ?',data);
        await db.query('DELETE FROM otp WHERE email=?',[email])
        return res.status(200).json({
            Success:true,
            Message:"User created successfully"
        })
    } catch (error) {
        console.log("Error while signup","=>",error);
        return res.status(500).json({
            Success:false,
            Message:"Something went wrong please try again"
        })
    }
};
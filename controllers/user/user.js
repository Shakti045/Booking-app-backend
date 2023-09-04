const db=require('../../config/dbconfing');
exports.getuserdetails=async(req,res)=>{
    try {
        const {id}=req.user;
        if(!id){
            return res.status(404).json({
                Success:false,
                Message:"Unauthorised access"
            })
        }
        const [[user]]=await db.query('SELECT * FROM user WHERE id=?',[id]);
        if(!user){
            return res.status(404).json({
                Success:false,
                Message:"User not found"
            })
        }
        return res.status(200).json({
            Success:true,
            Message:"User fetched successfully",
            User:user
        })
    } catch (error) {
        console.log("Error while fetching user","=>",error);
        return res.status(500).json({
            Success:false,
            Message:"Error while fetching user"
        })
    }
}

exports.updateprofilephoto=async(req,res)=>{
    try{
      const {id}=req.user;
      const {url}=req.body;
      if(!id || !url){
        return res.status(404).json({
            Success:false,
            Message:"Invalid request"
        })
      }
      await db.query('UPDATE user SET profileimage=? WHERE id=?',[url,id])
      return res.status(200).json({
        Success:true,
        Message:"Profile image updated successfully"
      })
    }catch(error){
        console.log("Error while updating profilephoto","=>",err)
        return res.status(500).json({
            Success:false,
            Message:'Error while updating profilephoto'
        })
    }
}


exports.getallbookings=async(req,res)=>{
    try {
        const {id}=req.user;
        if(!id){
            return res.status(404).json({
                Success:false,
                Message:'Invalid request'
            })
        }
       
        const [bookings]=await db.query('SELECT * FROM booking WHERE userid=? ORDER BY createdat DESC',[id])
        return res.status(200).json({
            Success:true,
            Message:'Details fetched successfully',
            Bookings:bookings
        })
    } catch (error) {
        console.log("Error while fetching all orderds of user",err);
        return res.status(500).json({
            Success:false,
            Message:'Something went wrong'
        })
    }
}
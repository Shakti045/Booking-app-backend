const db=require('../../config/dbconfing')

exports.createorder=async(req,res)=>{
       try {
         const {user:{id},body:{roomid,amountpaid,razorpayid,checkindate,checkoutdate,contactnumber,email}}=req
         if(!id || !roomid || !amountpaid || !razorpayid || !checkindate || !checkoutdate || !contactnumber || !email){
            return res.status(404).json({
                Success:false,
                Message:"Invalid request"
            })
         }

         const data={
            roomid:roomid,
            amountpaid:amountpaid,
            razorpayid:razorpayid,
            userid:id,
            checkindate:checkindate,
            checkoutdate:checkoutdate,
            contactnumber:contactnumber,
            email:email
         }

         await db.query('INSERT INTO booking SET ?',data)
         return res.status(200).json({
            Success:true,
            Message:'Booking created successfully'
         })
       } catch (error) {
         console.log("Error while creating order","=>",error);
         return res.status(500).json({
            Success:false,
            Message:'Error while creating order'
         })
       }
}
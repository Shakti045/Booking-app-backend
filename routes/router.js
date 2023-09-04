const express=require('express')
const router=express.Router();
module.exports=router;

const {sendotp}=require('../controllers/auth/otp');
const {signup}=require('../controllers/auth/signup')
const {login}=require('../controllers/auth/login');
const {getuserdetails,updateprofilephoto,getallbookings}=require('../controllers/user/user')
const {checkauth}=require('../middleware/middleware');
const {createorder}=require('../controllers/order/createorder')

router.post("/sendotp",sendotp);
router.post("/signup",signup);
router.post('/login',login);
router.get('/getuserdetails',checkauth,getuserdetails);
router.post("/updateprofilephoto",checkauth,updateprofilephoto);
router.post("/bookorder",checkauth,createorder);
router.get("/getallbookingsofuser",checkauth,getallbookings)
var express=require('express');
var router=express.Router();
var q=require('../db.js');

router.get('/',async(req,res)=>{
    var sql=`select * from blog`;
    var blog=await q(sql);
    var ser_sql=`select * from service`;
    var service_data=await q(ser_sql);
    res.render('web/index.ejs',{blog:blog,service:service_data});
})
router.post('/book_appointment',async(req,res)=>{
    var {name,email,service_id,appointment_date}=req.body;
    var sql=`insert into appointment_enquiry(name,email,service_id,appointment_date,status) values(?,?,?,?,?)`;
    var data=await q(sql,[name,email,service_id,appointment_date,'pending']);
    res.redirect('/');
    // res.send(appointment_date);
})

router.get('/whyus',(req,res)=>{
    res.render('web/whyus.ejs');
})

router.get('/service',(req,res)=>{
    res.render('web/service.ejs');
})

router.get('/team',(req,res)=>{
    res.render('web/team.ejs');
})

router.get('/pricing',(req,res)=>{
    res.render('web/pricing.ejs');
})

router.get('/dentalSolutions',async(req,res)=>{
    var sql=`select * from dentalsolutions`;
    var data=await q(sql);
    res.render('web/dentalSolutions.ejs',{data:data});
})


module.exports=router;
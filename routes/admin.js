var express=require('express');
var router=express.Router();
var q=require('../db.js');
var path=require('path');
var fs = require('fs');

router.get('/login',async(req,res)=>{
   
    res.render('admin/login.ejs');
})

router.post('/login_check',async(req,res)=>{
    // res.send(req.body);
    var {username,password}=req.body;
    var sql=`select * from login where username=? and password=?`;
    var data=await q(sql,[username,password]);
    // res.send(data);
    if(data){
        req.session.lid=data[0].lid;
        req.session.admin_name=data[0].admin_name;
        // res.send(req.session);
        res.redirect('/admin/index');
    }else{
        res.redirect('/admin/');
    }
    
})

router.use((req,res,next)=>{
    res.locals.session=req.session;
    next();
})
router.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/admin/');
})

router.get('/forgot',(req,res)=>{
    res.render('admin/forgot.ejs');
})

router.get('/index',(req,res)=>{
    var name=req.session.admin_name;
    res.render('admin/index.ejs',{name:name});
})

router.get('/about',(req,res)=>{
    res.render('admin/about.ejs');
})

router.get('/dentalsolutions',async(req,res)=>{
    var sql=`SELECT * FROM dentalsolutions`;
    var data=await q(sql);
    res.render('admin/dentalsolutions.ejs',{data:data});
})

router.post('/dentalsolutions_save',(req,res)=>{
    // res.send(req.body);
    var {title,descriptions}=req.body;
    var sql=`insert into dentalsolutions (title,descriptions)value(?,?)`;
    var data=q(sql,[title,descriptions]);
    // res.send(data);
    res.redirect('/admin/dentalsolutions');
})
router.get('/dentalsolutions_delete/:id',async(req,res)=>{
    var id=req.params.id;
    var sql=`delete from dentalsolutions where ds_id=?`;
    var data=await q(sql,[id]);
    res.redirect('/admin/dentalsolutions');
})
router.get('/dentalsolutions_edit/:id',async(req,res)=>{
    var id=req.params.id;
    var sql=`select * from dentalsolutions where ds_id=?`;
    var data=await q(sql,[id]);
    res.redirect("admin/dentalsolutions_edit",{data:data});
})

router.post('/dentalsolutions_edit/:id',async(req,res)=>{
    // res.send(req.body);
    var id=req.params.id;
    var {title,descriptions}=req.body;
    var sql=`update dentalsolutions set title=?,descriptions=? where ds_id=?)`;
    var data=await q(sql,[title,descriptions,id]);
    // res.send(data);
    res.redirect('/admin/dentalsolutions');
})
router.get('/blog',async(req,res)=>{
    var sql=`select * from blog`;
    var data=await q(sql);
    res.render('admin/blog.ejs',{data:data});
})

router.post('/blog_save',async(req,res)=>{
    // res.send(req.body);
    var {bdate,btitle,bdescriptions}=req.body;
    // res.send(req.files);
    var fname=Date.now()+req.files.bphoto.name;
    var uploadpath=path.join(__dirname,'../', 'public/images/',fname);
    req.files.bphoto.mv(uploadpath);
    // res.send(uploadpath);
    var sql=`insert into blog(bdate,btitle,bdescriptions,bphoto)value(?,?,?,?)`;
    var data=await q(sql,[bdate,btitle,bdescriptions,fname]);
    // res.send(data);
    res.redirect('/admin/blog');
})

router.get('/blog_delete/:id/:img',async(req,res)=>{
    var id=req.params.id;
    var img=req.params.img;
    var imgpath=path.join(__dirname,'../', 'public/images/',img);
    fs.unlink(imgpath,(err)=>{});
    var sql=`delete from blog where bid=?`;
    var data=await q(sql,[id]);
    res.redirect('/admin/blog');
})

router.get('/blog_edit/:id',async(req,res)=>{
    var id=req.params.id;
    var sql=`select * from blog where bid=?`;
    var data=await q(sql,[id]);
    res.render('admin/blog_edit.ejs',{data:data[0]});
})
router.post('/blog_edit_save/:id/:img',async(req,res)=>{
    var id=req.params.id;
    var img=req.params.img;
    var {bdate,btitle,bdescriptions}=req.body;
    if(req.files){
    var newimg=Date.now()+req.files.bphoto.name;
    var uploadpath=path.join(__dirname,'../','public/images/',newimg);
    req.files.bphoto.mv(uploadpath);
    var imgpath=path.join(__dirname,'../','public/images/',img);
    fs.unlink(imgpath,(err)=>{});
    }else{    
    var newimg=img;
    }
    var sql=`update blog set bdate=?,btitle=?,bdescriptions=?,bphoto=?`;
    var data=await q(sql,[bdate,btitle,bdescriptions,newimg,id]);
    // res.redirect(/admin/blog)
    res.send(data);
})

router.get('/service',async(req,res)=>{
   var sql=`select * from service`;
   var data=await q(sql);
   res.render('admin/service.ejs',{data:data});  
})

router.post('/service_save',async(req,res)=>{
    // res.send(req.body);
    var {title,descriptions}=req.body;
    var sql=`insert into service (title,description)value(?,?)`;
    var data=await q(sql,[title,descriptions]);
    // res.send(data);
    res.redirect('/admin/service');
}) 

router.get('/service_delete/:id',async(req,res)=>{
    var id=req.params.id;
    var sql=`delete from service where sid=?`;
    var data=await q(sql,[id]);
    res.redirect('/admin/service');
})

router.get('/team',async(req,res)=>{
    var sql=`select * from team`;
    var data=await q(sql);
    res.render('admin/team.ejs',{data:data});
})

router.post('/team_save',async(req,res)=>{
    // res.send(req.body);
    var {name,position}=req.body;
    var sql=`insert into team (name,position)value(?,?)`;
    var data=await q(sql,[name,position]);
    // res.send(data);
    res.redirect('/admin/team');
}) 

router.get('/team_delete/:id',async(req,res)=>{
    var id=req.params.id;
    var sql=`delete from team where tid=?`;
    var data=await q(sql,[id]);
    res.redirect('/admin/team');
})

router.get('/pricing',async(req,res)=>{
    var sql=`select * from pricing`;
    var data=await q(sql);
    res.render('admin/pricing.ejs',{data:data});
})

router.post('/pricing_save',async(req,res)=>{
    // res.send(req.body);
    var {title,description,price,rocedure}=req.body;
    var sql=`insert into pricing (title,description,price,rocedure)value(?,?,?,?)`;
    var data=await q(sql,[title,description,price,rocedure]);
    // res.send(data);
    res.redirect('/admin/pricing');
})

router.get('/pricing_delete/:id',async(req,res)=>{
    var id=req.params.id;
    var sql=`delete from pricing where pid=?`;
    var data=await q(sql,[id]);
    res.redirect('/admin/pricing');
})

router.get('/appointment_pending',async(req,res)=>{
    var sql=`select * from appointment_enquiry where status=?`;
    var data=await q(sql,['Pending']);
    res.render('admin/appointment_pending.ejs',{data:data});
})
router.get('/confirm/:id',async(req,res)=>{
    var id=req.params.id;
    var sql=`update appointment_enquiry set status=? where aid=?`;
    var data=await q(sql,['confirm',id]);
    res.redirect('/admin/appointment_pending');
})

router.get('/reject/:id',async(req,res)=>{
    var id=req.params.id;
    var sql=`update appointment_enquiry set status=? where aid=?`;
    var data=await q(sql,['reject',id]);
    res.redirect('/admin/appointment_pending');
})

router.get('/appointment_confirm',async(req,res)=>{
    var sql=`select * from appointment_enquiry where status=?`;
    var data=await q(sql,['confirm']);
    res.render('admin/appointment_confirm.ejs',{data:data});

})

router.get('/appointment_reject',async(req,res)=>{
    var sql=`select * from appointment_enquiry where status=?`;
    var data=await q(sql,['reject']);
    res.render('admin/appointment_reject.ejs',{data:data});

})

router.get('/appointment_search',async(req,res)=>{
    // res.send(req.body);
    var from_date=req.query.from_date;
    var to_date=req.to_date;
    var status=req.query.status;
    var sql=`select * from appointment_enquiry where appointment_date>=? and appointment_date<=? and status=? `;
    var data=await q(sql,[from_date,to_date,status]);
    // res.send(data);
    res.render('admin/appointment_pending.ejs',{data:data});
})

module.exports=router;
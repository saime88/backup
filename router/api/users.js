const express = require("express");
const router = express.Router();
const User = require('../../model/user')
const keys = require('../../config/keys');
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken')
const passport = require('passport')
router.get('/',(req,res)=>{
    res.json({msg:"login works"})
})


//  psot注册页面
router.post('/register',(req,res)=>{  
   
    //查询数据库中是否拥有邮箱
    User.findOne({email:req.body.email}).then(user=>{
        if(user){
            // res.status(400).json({
            //     code:400,
            //     msg:"该用户已存在，请重新注册！"
            // })
           console.log(user)
            
            return res.status(400).json( '邮箱已被注册!');
        }
        else{
        //    res.status(200).json({
        //        code:200,
        //        msg:"注册成功！"
        //    })

        var avatar = gravatar.url('req.body.email', {s: '200', r: 'pg', d:'mm'});
           const newUser = new User({
               name:req.body.name,
               email:req.body.email,
               password:req.body.password,
               avatar,
               identity:req.body.identity


            
           })
           bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(newUser.password,salt,function(err, hash){
               if(err){
                   console.log(err)
               }
                 newUser.password = hash;
                 newUser
                 .save()
                 .then(user =>{
                     console.log("新用户："+user)

                    //  返回注册用户信息,
                     res.json(user)
                })
                 .catch(err=>{console.log(err)})
            });
        });
        }
    
    })
})

//登入页面

router.post('/login',(req,res)=>{
    const email = req.body.email
    const password = req.body.password

    //邮箱匹配
    User.findOne({email})
    .then((user)=>{
        if(!user){
           return res.status(400).json({
                code:400,
                msg:"邮箱错误"
            })
     
        }
        //密码匹配
        else{
            bcrypt.compare(password,user.password).then(isMatch=>{
                if(isMatch){
                    const rule = {id:user.id,name:user.name,avatar:user.avatar,identify:user.identify}
                    //jwt.sign("规则","","过期时间","函数")
                    jwt.sign(rule,keys.secretOrKey,{expiresIn:3000},(err,token)=>{
                        if(err){
                            console.log(err)
                        }
                     res.json({
                        success:true,
                        token:"Bearer " + token
                    })
                    })
                    // res.status(200).json({
                    //     code:200,
                    //     msg:"登入成功！"
                    // })
                }
                else{
                    return res.status(500).json({
                        code:500,
                        msg:"密码错误"
                    })
                }
                
            })
        }

    }).catch()


})

router.get("/current",passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.json({
        id:req.user.id,
        name: req.user.name,
        email: req.user.email,
        identity: req.user.identity
    })
})


module.exports = router;
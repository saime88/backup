const express = require("express");
const router = express.Router();
const profiles= require('../../model//profile')
const keys = require('../../config/keys');
const passport = require('passport')
const jwt = require('jsonwebtoken')

//  post添加信息
router.post("/add",(req,res)=>{
    const profile={}
  if(req.body.id) profile.id = req.body.id
  if(req.body.date) profile.date = req.body.date
  if(req.body.extendType) profile.extendType = req.body.extendType
  if(req.body.extendDecr) profile.extendDecr = req.body.extendDecr
  if(req.body.expend) profile.expend = req.body.expend
  if(req.body.cash) profile.cash = req.body.cash
  new profiles(profile).save().then(profile=>{
      console.log(profile)
      res.json(profile)
  })
// res.json({msg:"测试add接口"})
})


//get 查询所有信息
router.get('/total',passport.authenticate('jwt',{session:false}),(req,res)=>{
  profiles.find().then((profile)=>{
      if(!profile){
        return res.status(404).json("当前没有任何内容")
      }
      res.json(profile)
  }).catch(err=>{console.log(err)})
})

//get 查询单个信息

router.get('/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
      profiles.findOne({_id:req.param.id}).then(profile=>{
        if(profile) res.json("查找失败")
         res.json(profile)
      })
})

//edit 根据id编辑信息
router.post('/edit/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
  const profilesFields={}
  if(req.body.id) profilesFields.id = req.body.id
  if(req.body.date) profilesFields.date = req.body.date
  if(req.body.extendType) profilesFields.extendType = req.body.extendType
  if(req.body.extendDecr) profilesFields.extendDecr = req.body.extendDecr
  if(req.body.expend) profilesFields.expend = req.body.expend
  if(req.body.cash) profilesFields.cash = req.body.cash
      profiles.findByIdAndUpdate(
        {_id:req.params.id},
        {$set:profilesFields},
        {new:true}).then(profile=>{
          res.json(profile)
})
})
//delete 根据id删除信息
router.delete('/delete/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
  profiles.findByIdAndRemove({_id:req.params.id}).then(newprofiles=>{
    newprofiles.save().then(profile=>{
      res.json(profile)
    })
  }).catch(err=>{console.log(err)})
})

module.exports = router;
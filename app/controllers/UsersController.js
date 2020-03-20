const User=require('../model/User') 
const _=require('lodash')
module.exports.register=(req,res)=>{
    const body=req.body
    const user=new User(body)
    user.save()
    .then(user=>res.json(_.pick(user,['_id','username','email'])))
    .catch(err=>res.json(err))
}

module.exports.login=(req,res)=>{
    const body=req.body
    User.findByCredentials(body.email,body.password)
    .then(user=>{
        return user.generateToken()
    })
    .then(token=>res.setHeader('x-auth',token).json({}))
    .catch(err=>res.json(err))
}

module.exports.account=(req,res)=>{
    const {user}=req
    res.json(_.pick(user,['_id','username','email']))
}

module.exports.logout=(req,res)=>{
    const {user,token}=req
    User.findByIdAndUpdate(user._id,{$pull:{tokens:{token:token}}})
    .then(()=>{
        res.json({notice:'Successfully logged out'})
    })
    .catch(err=>res.json(err))
}
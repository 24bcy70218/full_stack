const express=require('express');
const jwt=require('jsonwebtoken');
const cors=require('cors');

const app=express();
app.use(cors());
app.use(express.json());

const SECRET="mySecretKey123";

const USERS=[{id:1,username:"admin",password:"password123"}];

function verifyToken(req,res,next){
 const auth=req.headers['authorization'];
 const token=auth && auth.split(' ')[1];
 if(!token) return res.status(401).json({error:"Missing token"});
 try{
  const decoded=jwt.verify(token,SECRET);
  req.user=decoded;
  next();
 }catch{
  res.status(401).json({error:"Invalid token"});
 }
}

app.post('/api/login',(req,res)=>{
 const {username,password}=req.body;
 const user=USERS.find(u=>u.username===username && u.password===password);
 if(!user) return res.status(401).json({error:"Invalid credentials"});
 const token=jwt.sign({id:user.id,username:user.username},SECRET,{expiresIn:"1h"});
 res.json({token});
});

app.get('/api/protected',verifyToken,(req,res)=>{
 res.json({message:`Welcome ${req.user.username}`,user:req.user});
});

app.listen(3001,()=>console.log("Server running 3001"));

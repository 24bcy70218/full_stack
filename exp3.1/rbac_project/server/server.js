const express=require('express');
const cors=require('cors');

const app=express();
app.use(cors());
app.use(express.json());

// fake users
const USERS=[
 {username:"admin",role:"admin"},
 {username:"user",role:"user"}
];

// middleware
function checkRole(role){
 return (req,res,next)=>{
  const user=req.headers['user']; // simple simulation
  const found=USERS.find(u=>u.username===user);
  if(!found || found.role!==role){
   return res.status(403).json({error:"Access Denied"});
  }
  next();
 };
}

// routes
app.get('/api/admin',checkRole("admin"),(req,res)=>{
 res.json({msg:"Admin Dashboard"});
});

app.get('/api/user',(req,res)=>{
 res.json({msg:"User Profile"});
});

app.listen(4000,()=>console.log("Server running 4000"));

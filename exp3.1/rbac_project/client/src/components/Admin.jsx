import {useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';

export default function Admin(){
 const [msg,setMsg]=useState("");
 const nav=useNavigate();

 useEffect(()=>{
 fetch('http://localhost:4000/api/admin',{headers:{user:"user"}})
 .then(res=>{
  if(res.status===403) nav('/denied');
  return res.json();
 })
 .then(data=>setMsg(data.msg));
 },[]);

 return <h2>{msg}</h2>;
}

import {useState} from 'react';
import api from '../api/axios';
import {useNavigate} from 'react-router-dom';

export default function Login(){
 const [form,setForm]=useState({username:'',password:''});
 const [err,setErr]=useState('');
 const nav=useNavigate();

 const submit=async e=>{
  e.preventDefault();
  try{
   const {data}=await api.post('/login',form);
   localStorage.setItem('token',data.token);
   nav('/dashboard');
  }catch(e){
   setErr('Invalid credentials');
  }
 };

 return(<div>
 <h2>Login</h2>
 {err && <p>{err}</p>}
 <form onSubmit={submit}>
 <input name="username" onChange={e=>setForm({...form,username:e.target.value})}/>
 <input type="password" name="password" onChange={e=>setForm({...form,password:e.target.value})}/>
 <button>Login</button>
 </form>
 </div>);
}

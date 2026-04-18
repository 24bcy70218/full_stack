import {useEffect,useState} from 'react';
import api from '../api/axios';
import {useNavigate} from 'react-router-dom';

export default function Dashboard(){
 const [data,setData]=useState(null);
 const nav=useNavigate();

 useEffect(()=>{
  api.get('/protected')
  .then(res=>setData(res.data))
  .catch(()=>{
   localStorage.removeItem('token');
   nav('/login');
  });
 },[]);

 if(!data) return <p>Loading...</p>;

 return(<div>
 <h2>{data.message}</h2>
 <button onClick={()=>{localStorage.removeItem('token');nav('/login')}}>Logout</button>
 </div>);
}

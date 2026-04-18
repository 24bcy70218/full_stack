import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';
import Admin from './components/Admin';
import User from './components/User';
import AccessDenied from './components/AccessDenied';

function App(){
 return(
 <BrowserRouter>
 <nav>
 <Link to="/admin">Admin</Link> | 
 <Link to="/user">User</Link>
 </nav>
 <Routes>
 <Route path="/admin" element={<Admin/>}/>
 <Route path="/user" element={<User/>}/>
 <Route path="/denied" element={<AccessDenied/>}/>
 </Routes>
 </BrowserRouter>
 );
}
export default App;

import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Search from './components/Search/Search';
import { createContext, useContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const userContext = createContext();

function App() {
  
  
  const [signedInUser, setSignedInUser] = useState({});
  const [loggedInUser, setLoggedInUser]= useState({});
  

  
  return (
    <userContext.Provider value ={[loggedInUser, setLoggedInUser, signedInUser, setSignedInUser]} className="App">
      
      <Router>
      <nav>
        <header>
          Metro Journey
        </header>
        <div className='nav-link'>
          <Link className='nav' to="/">Home</Link>
          <Link className='nav' to="/destination">Destination</Link>
          <Link className='nav' to="/blog">Blog</Link>
          <Link className='nav' to="/contact">Contact</Link>
          {
          loggedInUser.email? <Link className='nav-btn' >{loggedInUser.name}</Link>:<Link className='nav-btn' to="/login">Login</Link>
          }
          
        </div>
        
      </nav>
      <Switch>
        <Route exact path='/'>
          <Home></Home>
        </Route>
        <Route path='/login'>
          <Login></Login>
        </Route>
        <PrivateRoute path='/search/package/:id'>
          <Search ></Search>
        </PrivateRoute>
      </Switch>
      </Router>
    </userContext.Provider>
  );
}

export default App;

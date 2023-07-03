
import './App.css';
import Header from './Header';
import Home from './Homepage';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Productdes from './productdes';
import Cart from './cartpage';
import Checkout from './checkout';
import Footer from './footer';
import Favoruite from './Favourite';
import Signin from './signin';
import Nopage from './Nopage';
import Login from './Login';




function App() {
  return (
    <div >
      
      <BrowserRouter>
    <Header/>
   <Routes>
    <Route path='/'  element={<Home/>}/>
    <Route path='pd/:id' element={<Productdes/>}/>
    <Route path='cart' element={<Cart/>}/>
    <Route path='checkout' element={<Checkout/>}/>
    <Route path='fav' element={<Favoruite/>} />
    <Route path='signin' element={<Signin/>} />
    <Route path='Login' element={<Login/>} />
    <Route path='*' element={<Nopage/>} />
  </Routes>
   <Footer/>
   
    </BrowserRouter>
    </div>
  );
}

export default App;

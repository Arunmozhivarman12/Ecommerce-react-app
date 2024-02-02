import React, { useEffect } from "react";
import {Container,Navbar,NavDropdown,Nav, Button} from "react-bootstrap"
import logo from './logo.png'
import { useState } from "react";
import search from "./search.png"
import heart from "./heart.png";
import cart from "./cart.png";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


function Header(){
const navigate = useNavigate();
const [isloggedin,setIsloggedin] = useState(false);
const pros = useSelector((state) => state.Pros)
const list = useSelector((state) => state.cart.product);
const fav = useSelector((state) => state.cart.fav);
const [inputshow,setInputshow] = useState(false);
const [box,setBox] = useState('');
const [rbox,setrBox] = useState(false);

 const searched =  pros.filter((item) => item.name.toLowerCase().includes(box));
 const searchb = (e) => {
setBox(e.target.value);
  setrBox(true);
 }

const showit = () => {
setInputshow(true);
}

const Hidebox = () => {
  setTimeout(() => {
    setrBox(false)
  },300)
}


  const [show, setShow] = useState(false);
const showDropdown = (e)=>{
    setShow(!show);
}
const hideDropdown = e => {
    setShow(false);
}

useEffect(() => {
  
const token = localStorage.getItem('token');
if(token){
  setIsloggedin(true)
}

})

const logout = () =>{
  localStorage.removeItem('token');
  window.location.href = '/';
}

function carttocheck (){
  alert('products in cart will be proceeded to checkout')
  navigate('checkout')
}

    return(
        <div className="head">
<Container fluid className=" black1">
<Container className=" text-white ps-2 pe-2 pt-2 pb-2  black" >
    <span>Free shipping, 30-day return or refund guarantee.</span> 
    <span style={{float :'right'}}>
<ul className="text-end fs-6">
    {isloggedin? (<li className="gotosign" type='button' onClick={logout}>LOG OUT</li>):(  <li className="gotosign"><Link className="text-light" to={'signin'}>SIGN IN</Link></li>)}
    <li type='button'>FAQs</li>
    <li type='button'>USD</li>
</ul>
   </span>
</Container>
</Container>
<div className="bg-light">
    <Container className="nb ps-2 pe-2" >     
   
<Navbar  className="w-100 " expand="lg" >
        <Navbar.Brand className="me-0" ><img src={logo} alt='logo'/></Navbar.Brand>
         <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />
         <Navbar.Offcanvas
              id="offcanvasNavbar-expand-lg"
              aria-labelledby='offcanvasNavbarLabel-expand-lg'
              placement="start"
              className='offn'
            >
         <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">
                
<ul className="ofs">
 
   {isloggedin?(<li type='button' onClick={logout}>LOG OUT </li>):(<li type='button'className="gotosign "><Link className="text-dark" to={'signin'}>SIGN UP</Link></li>)} 
    <li type='button'>FAQs</li>
    <li type='button'>USD</li>
</ul>

<p className="ofsp">Free shipping, 30-day return or refund guarantee.</p>
   
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
          <Nav className="m-auto ">
            <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
            <Nav.Link >Shop</Nav.Link>
            <NavDropdown className="dd" title="Pages" show={show}
   onMouseEnter={showDropdown} 
   onMouseLeave={hideDropdown}  id='offcanvasNavbarDropdown-expand-lg'>
              <NavDropdown.Item className="dl" href="#action/3.1">About Us</NavDropdown.Item>
              <NavDropdown.Item className="dl" href="#action/3.2">
                Shopping details
              </NavDropdown.Item>
              <NavDropdown.Item className="dl" type='button' onClick={()=>navigate('cart')}>Shopping Cart</NavDropdown.Item>
              <NavDropdown.Item className="dl"  onClick={carttocheck}>Check Out</NavDropdown.Item>
              <NavDropdown.Item className="dl" href="#action/3.5">Blog Details</NavDropdown.Item>
            </NavDropdown> 
            <Nav.Link >Blog</Nav.Link>
            <Nav.Link >Contacts</Nav.Link>            
    </Nav>
      <Nav className="sin ">
       {inputshow ? (
      <input type="text" placeholder="Search" className="search ps-1 pb-2 me-3" onChange={searchb} onBlur={Hidebox} value={box}></input>
       ):(
         <img src={search}  type= 'button' alt= 'search' className="si" onClick={showit}/>
     )}
           <Link to={'fav'} className="m-0 p-0 newl">
           <div className="ci">
             <img src={heart}  type= 'button' alt='heart' className="si"/>
             {fav.length === 0 ? (<></>):(<div className="notify">{fav.length}</div>)}
            </div>
             </Link>
           <Link to={'cart'} className='m-0 p-0 '>
            <div className="ci">
            <img src={cart} type= 'button' alt='cart' className="si"/> 
            {list.length === 0 ? (<></>):(<div className="notify">{list.length}</div>)}
            </div>
            </Link>{rbox?(<div className="fb ps-4 pt-4">
         {searched.length === 0 ? (<p>no results</p>):(searched.map((res) =>(
           <Link to={`pd/${res.id}`} className='p-0 m-0 fs-6 sli'><p key={res.id} type={'button'}>{res.name}</p></Link>
         )))}</div>):(<div></div>)}
            </Nav>
    </Offcanvas.Body>   
</Navbar.Offcanvas>
    </Navbar>
      
    </Container>
    </div>
 
    </div>
    );
};

export default Header;
  



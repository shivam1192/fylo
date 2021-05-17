import React, { useContext,useState } from 'react';
import {Navbar,Nav,Button,Form,FormControl} from 'react-bootstrap';

const NavbarFun = () =>{
    return(
        <>
         <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">Bank Branches</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home"></Nav.Link>
      <Nav.Link href="#features"></Nav.Link>
      <Nav.Link href="#pricing"></Nav.Link>
    </Nav>
  </Navbar>
        </>
    )
}
export default NavbarFun;

import React,{useState,useEffect} from "react";
import Nav_after_LS from "../Navbar/Nav_after_LS";
import User from "../User/user";
import Footbar from "../Footbar/Footbar";
import Navbar from "../Navbar/Navbar";
import {useLocation} from "react-router-dom";

const Layout = ()=>{
  const location = useLocation();
  

  const Flag = location.state == null ? false : true;

  // useEffect(() => {
  //   fetch('http://localhost:8000/auth/checklogin', {
  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' },
  //     credentials: 'include',
  //   })
  //     .then((res) => { res.json() })
  //     .then((res) => {console.log(Flag);});
  // }, []);

  const check_Login = ()=>{
    if(Flag === true){
      return(
        <Nav_after_LS/>
      )
    }
    else{
      return(
        <Navbar/>
      )
    }
  }

  return(
    <>
      {check_Login()}
      <User/>
      <Footbar/>
    </>
  );
}

export default Layout;
import React from "react";
import './Navbar.css';
import { useNavigate } from "react-router-dom";

const Navbar = () =>{
  const navi = useNavigate();
  return(
    <>
      <div className='mnavbox bg_color'>
          <div className='fnavbox'>
            <div className='navlogo'>Logo</div>
            <div className='snavbox'>
              <div className='navhome'>Home</div>
              <div className='navls' onClick={()=>{
                navi('/LS');
              }}>Login/Signup</div>
            </div>
          </div>
        </div>
    </>
  );
}

export default Navbar;
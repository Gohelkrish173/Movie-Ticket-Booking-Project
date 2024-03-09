import React from "react";
import './Footbar.css';
import { useNavigate } from "react-router-dom";

const Footbar = () =>{
  const navi = useNavigate();
  return(
    <>
      <div className='mfootbox bg_color'>
        <div className="foot_text">
          © 2024 Copyright : MovieTicketBooking.com
        </div>            
      </div>
    </>
  );
}

export default Footbar;
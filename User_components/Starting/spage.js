import "./spage.css";
import { useNavigate } from "react-router-dom";

const spage = ()=>{
  const navigate = new useNavigate();
  return(
    <>
      <div className="box">
        <div className="box-4">
          <div className="box-2"> 
            <div className="box-3">
              <div className="box-b">Welcome To Movie Ticket Booking Website,</div>
              <div className="box-c">Select Which Type Of Use You Want.</div>
            </div>
          </div>
          <div className="box-1">
            <div id="box_text_icon_color" className="box-a" onClick={()=>{
              navigate('/layout');
            }}>
              <div className="box-i fa fa-user"></div>
              <div className="box-ii">User</div>
            </div>
            <div className="box-a" onClick={()=>{
              navigate('/A_Layout');
            }}>
              <div className="box-i fa fa-user-tie"></div>
              <div className="box-ii">Admin</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )  
}

export default spage;
import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import './Navbar.css';

const Nav_after_LS = () => {

  const [userdata,setUserdata] = useState({});
  const navi = useNavigate();
  
  const getUserData = async () => {
    try {
        const response = await fetch(`http://localhost:8000/auth/getuser`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        const data = await response.json();
        if (data.ok) {
            setUserdata(data.data);
        } else {
            console.log(data);
        }
    } catch (error) {
        console.error(error);
    }
};

  useEffect(()=>{
    getUserData();
  });
  return (
    <>
      <div className='mnavbox bg_color'>
        <div className='fnavbox'>
          <div className='navlogo'>Logo</div>
          <div className='snavbox'>
            <div className='navhome'>Home</div>
            <div className='navprofile' onClick={() => {
              navi('/Profile')
            }}><img src={userdata.userImg} /></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Nav_after_LS;
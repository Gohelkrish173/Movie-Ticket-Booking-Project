import { useNavigate, Form } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './profile.css';
import Navbar from '../Navbar/Navbar';
import Footbar from '../Footbar/Footbar';
import { findByTestId } from '@testing-library/react';
import Nav_after_LS from '../Navbar/Nav_after_LS';

const Profile = () => {
  const [userdata, setUserdata] = useState({});
  const navi = useNavigate();

  // const getuserdetail = async () => {
  //   try{
  //     const response = await fetch(`http://localhost:8000/auth/getuser`,{
  //       method : "GET",
  //       headers : {"Content-Type" : "application/json"},
  //       credentials : "include"
  //     });
  //     const data = await response.json();
  //     if(data.ok){
  //       setUserdata(data.data);
  //     }
  //     else{
  //       console.log(data);
  //     }
  //   }catch(e){
  //     console.log(e)
  //   }
  // };

  useEffect(() => {
    fetch("http://localhost:8000/auth/getuser", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
      .then((res) => res.json())
      .then((res) => { setUserdata(res.data); console.log(userdata) });
  }, []);

  return (
    <>
      <Nav_after_LS/>
      <div className='impbox'>

        {/* profile-box */}
        <div className='mainprofilebox'>
          <div className='container profilebox-1'>
            <div className=' profilebox_a'>
              <div className='profilebox_a1'>
                <img src={userdata.userImg} />
              </div>
            </div>
            <div className='profilebox_b'>
              <div id="detail"><h2 id="detail">●  Detail  ●</h2></div>
              <div id="d1"><p id="d1">UserId : {userdata._id}</p></div>
              <div id="d1"><p id="d1">Name : {userdata.name}</p></div>
              <div id="d1"><p id="d1">Email : {userdata.email}</p></div>
              <div id="d1"><p id="d1">Mobile NO. : {userdata.mobile}</p></div>
              <div id="d1"><p id="d1">City : {userdata.City_name}</p></div>
              <div id="d1"><p id="d1">Booked Tickets : </p></div>
              <div id="d1"><input type='button' value='Logout' id="logout" onClick={(e) => {
                e.preventDefault();

                fetch("http://localhost:8000/auth/logout", {
                  method: "GET",
                  headers: { "Content-Type": "application/json" },
                  credentials: "include",
                })
                  .then((res) => console.log(res))
                  .then((res) => navi("/LS"));
              }} /></div>
            </div>
          </div>
        </div>
      </div>
      <Footbar/>
    </>
  );
}

export default Profile;
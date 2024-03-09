import React from "react";
import { useState, useEffect } from "react";
import './ls.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LS = () => {
  const formData = new FormData();
  const [Login, setLogin] = useState({ email: "", password: "" });
  const [detail, setDetail] = useState({name : '',email : '',mobile : '', userimg : '' ,City_name : '', password : ''});
  const navi = useNavigate();

  const signup = () => {
    var x = document.getElementById("login");
    var y = document.getElementById("signup");
    var z = document.getElementById("btn");
    x.style.left = "400px";
    y.style.left = "50px";
    z.style.left = "110px";
  }

  const login = () => {
    var x = document.getElementById("login");
  var y = document.getElementById("signup");
  var z = document.getElementById("btn");
    x.style.left = "50px";
    y.style.left = "450px";
    z.style.left = "0px";
  }

  // const uploadfile = async () =>{
  //   const formdata = new FormData();
  //   formdata.append('file',file)
  //   axios.post('http://localhost:8000/auth/register',formdata)
  //   .then((res)=>setDetail.userImg(res))
  // }

  const handelLogin = async (e) => {
    e.preventDefault();
    const responce = await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      credentials : 'include',
      body: JSON.stringify(Login)
    });
    const json = await responce.json();
    if(responce.ok){
      document.cookie = `authToken=${json.data.authToken}; path=/;`
      document.cookie = `refreshToken=${json.data.refreshToken}; path=/;`
      navi('/Layout',{state : responce.ok});
      console.log(document.cookie.authToken);
    }
  }


  const handelSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name",detail.name);
    formData.append("email",detail.email);
    formData.append("mobile",detail.mobile);
    formData.append("City_name",detail.City_name);
    formData.append("password",detail.password);
    formData.append("userimg",detail.userimg);
    // console.log(name,email,mobile,City_name,password,userimg);

    
    // const result = await axios.post(
    //   "http://localhost:8000/auth/register",formData,{
    //     headers : 
    //   }
    // ) 

    const responce = await axios.post("http://localhost:8000/auth/register",
      formData,
      {
        headers :{"Content-Type" : "multipart/form-data"} 
      }
    )
      // .then((res) => { res.json() })
    .then((res) => { console.log(res) });
  }

  return (
    <>
      <div className="hero">
        <div className="form-box">
          <div className="button-box">
            <div id="btn"></div>
            <button type="button" className="toggle-btn" onClick={login}>Login</button>
            <button type="button" className="toggle-btn" onClick={signup}>Signup</button>
          </div>

          {/* login page */}

          <form id="login" className="input-group">
            <input type="email" className="input-field" placeholder="Email or UserName" onChange={(e) => {
              setLogin({ ...Login, email: e.target.value })
            }} required />
            <input type="text" className="input-field" placeholder="Password" onChange={(e) => {
              setLogin({ ...Login, password: e.target.value })
            }} required />
            
            {/* <input type="checkbox" className="check-box"  /><span>Remember Password</span> */}
            <button type="submit" id="submit_btn" onClick={handelLogin}>Login</button>
          </form>

          {/* sinup page */}

          <form id="signup" className="input-group">
            <input type="text" className="input-field" placeholder="Name" onChange={(e) => {
              setDetail({...detail, 'name':e.target.value});
            }} required />
            <input type="email" className="input-field" placeholder="Email Id" onChange={(e) => {
              setDetail({...detail, 'email':e.target.value});
            }} required />
            <input type="text" className="input-field" placeholder="Mobile" onChange={(e) => {
              setDetail({...detail, 'mobile':e.target.value});
            }} required />
            <input type="text" className="input-field" placeholder="city" onChange={(e) => {
              setDetail({...detail, 'City_name':e.target.value});
            }} required />
            <input type="file" className="input-field2" placeholder="userImg" accept="image/*" onChange={(e) => {
              setDetail({...detail, 'userimg':e.target.files[0]});
            }} required />
            {/* <input type="submit" className="input-field" placeholder="upload image" onClick={uploadfile} /> */}
            <input type="text" className="input-field" placeholder="Password" onChange={(e) => {
              setDetail({ ...detail, password: e.target.value })
            }} required />
            <input type="checkbox"/><p className="check_box">I agree to the terms & condition</p>
            <button type="submit" id="submit_btn" onClick={handelSubmit}>Signup</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LS;
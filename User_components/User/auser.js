import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
import './auser.css';

const AUser = () => {
  const navi = useNavigate();
  const [checkuser, setCheckuser] = useState();
  const [userdata, setUserdata] = useState({});

  // const token1 = Cookies.get('authtoken');
  // const token2 = Cookies.get('refreshtoken');

  useEffect(() => {
    fetch('http://localhost:8000/auth/checklogin', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then((res) => { res.json() })
      .then((res) => {
        if (res) {
          console.log(res);
          setCheckuser(res);
        }
      });
  }, []);

  // useEffect(() => {
  //   fetch('http://localhost:8000/auth/getuser', {
  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' },
  //     credentials: 'include',
  //   })
  //     .then((res) => {res.json()})
  //     .then((res) => { setUserdata(res); console.log(userdata) });
  // }, []);

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

  const simg = [{
    title: 'movie-1',
    label: "Crakk",
    imgPath:
      "https://i.ytimg.com/vi_webp/8xjSvwi7W-0/hqdefault.webp",
  },
  {
    title: 'movie-2',
    label: "Artical 370",
    imgPath:
      "https://imgeng.jagran.com/images/2024/feb/article%203701708661474185.jpg",
  },
  {
    title: 'movie-3',
    label: "Lagan Special",
    imgPath:
      "https://m.media-amazon.com/images/M/MV5BZjg1ZTRlYmUtMzYzMi00ZmFiLTk4NGQtZWI2ODFhYTE2MDY1XkEyXkFqcGdeQXVyMTc2OTMwMzkw._V1_.jpg",
  },
  ];

  return (
    <>
      <div>
        <div className='container mnavbox bg-light'>
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

        <div className=''>

          <div id="carouselExampleControls" class="carousel slide slider_image" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src={simg[0].imgPath}  class="d-block w-100" alt="..." />
              </div>
              <div class="carousel-item">
                <img src={simg[1].imgPath} class="d-block w-100" alt="..." />
              </div>
              <div class="carousel-item">
                <img src={simg[2].imgPath} class="d-block w-100" alt="..." />
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        <div className='container'>
          <h1><ul><li>Latest Movies</li></ul></h1>
          <div className='col mainboxcard'>

            <div className='movieCard'>
              <div className='image_field'><img className='images2' src='https://m.media-amazon.com/images/M/MV5BMjI0MzU3MTM1Ml5BMl5BanBnXkFtZTgwOTk2MjQ0MDE@._V1_.jpg' /></div>
              <div><h4>Movie Name</h4></div>
              <div><h5>Prize</h5></div>
            </div>

            <div className='movieCard'>
              <div className='image_field'><img className='images2' src='https://m.media-amazon.com/images/M/MV5BMjE4YjgyMGQtMWM0MS00MGVjLTlmNzYtMTNiNGY1NTNlZjJiXkEyXkFqcGdeQXVyMTEzNzg0Mjkx._V1_.jpg' /></div>
              <div><h4>Movie Name</h4></div>
              <div><h5>Prize</h5></div>
            </div>

            <div className='movieCard'>
              <div className='image_field'><img className='images2' src='https://m.media-amazon.com/images/M/MV5BODUwNDNjYzctODUxNy00ZTA2LWIyYTEtMDc5Y2E5ZjBmNTMzXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg' /></div>
              <div><h4>Movie Name</h4></div>
              <div><h5>Prize</h5></div>
            </div>

            <div className='movieCard'>
              <div className='image_field'><img className='images2' src='https://m.media-amazon.com/images/M/MV5BMjE4YjgyMGQtMWM0MS00MGVjLTlmNzYtMTNiNGY1NTNlZjJiXkEyXkFqcGdeQXVyMTEzNzg0Mjkx._V1_.jpg' /></div>
              <div><h4>Movie Name</h4></div>
              <div><h5>Prize</h5></div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default AUser;
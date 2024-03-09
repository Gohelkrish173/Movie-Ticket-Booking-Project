import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './user.css';


const User = () => {

  const [index, setIndex] = useState(0);
  const navi = useNavigate();

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
        {/* <div className='container mnavbox bg_color'>
          <div className='fnavbox'>
            <div className='navlogo'>Logo</div>
            <div className='snavbox'>
              <div className='navhome'>Home</div>
              <div className='navls' onClick={()=>{
                navi('/LS');
              }}>Login/Signup</div>
            </div>
          </div>
        </div> */}

        <div className='bg_color'>

          <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src={simg[0].imgPath} class="d-block w-100" alt="..." />
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

        <div className='container col-12' id="Latest_Movie">
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
              <div className='txt_name'><h4>Movie Name</h4></div>
              <div className='txt_name'><h5>Prize</h5></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default User;
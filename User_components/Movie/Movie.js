import { useNavigate } from 'react-router-dom';
import './movie.css';

const Movie = () => {
  const navi = useNavigate();
  return (
    <>
      <div className='moviebox'>
        {/* navbar */}
        <div className='container mnavbox bg-warning'>
          <div className='fnavbox'>
            <div className='navlogo'>Logo</div>
            <div className='snavbox'>
              <div className='navhome'>Home</div>
              <div className='navprofile' onClick={() => {
                navi('/Profile')
              }}><img src="./assets/IMP_44.JPG" /></div>
            </div>
          </div>
        </div>

        {/* Thumbnil */}
        <div className='moviethumb'>
          <div className='container thumb1'>
            <div className='thumb_A'>
              <div className='thumb_a'>
                <img src="https://filmfreeway-production-storage-01-storage.filmfreeway.com/press_kits/posters/001/631/209/original/45241c3c73-poster.jpg?1597445988"/>
                <div id="posterfooter"><h5>in chinema</h5></div>
              </div>

              <div className='thumb_b'>
                <div className='thumb_b1'>
                  <h1>Movie Name</h1>
                  <div>Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description - cast - crew */}
        <div className='container mainDCC'>
          <div className='disctext1'>Description :-</div>
          <div className='disctext2'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
        

          <div className='maincast'>
            <div className='castbox1'>
              <h3>Cast</h3>
            </div>
            <div className='castbox1'>
              <h3>Crew</h3>
            </div>
          </div>

          <div className='bookingTButton'>
            <input type='button' value='BookTicket'/>
          </div>
        </div>

      </div>
    </>
  );
}

export default Movie;
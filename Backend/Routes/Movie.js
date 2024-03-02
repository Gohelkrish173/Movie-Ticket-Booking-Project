const express = require('express');
const router = express.Router();

const User = require('../Model/User_Schema');
const Movie = require('../Model/Movie_Schema');
const Screen = require('../Model/Screen_Schema');
const Booking = require('../Model/Booking_Schema');

const errorHandler = require('../Middleware/errorMiddleware');
const adminTokenHandler = require('../Middleware/checkAdminToken');
const authTokenHandler = require('../Middleware/checkAuthToken');

router.get('/test',async(req,res)=>{
  res.json({
    message: "Auth API is working",
  })
});

function createResponce(ok,message,data){
  return{
    ok,
    message,
    data,
  };
}

// admin access
// create movie using post
router.post('/createmovie',adminTokenHandler, async (req,res,next)=>{
  try {
    const {title, description,portraitImgUrl,landscapeImgUrl,rating,duration} = req.body;

    const newMovie = new Movie( {title, description,portraitImgUrl,landscapeImgUrl,rating,duration});
    await newMovie.save();
    res.status(201).json({
      ok: true,
      message :"movie added successfully"
    });

  } catch (error) {
    next(error);
  }
});

// add a celebrity in specific movie using post
router.post('/add_celebrity_to_movie', adminTokenHandler,async (req,res,next)=>{
  try {
    const {movie_Id, celebType,celebName,celebRole,celebImage} = req.body;
    const movie = await Movie.findById(movie_Id);
    if(!movie){
      return res.status(404).json({ok:false,message:"Movie not found."});
    }

    const newCeleb = {
      celebType,
      celebName,
      celebRole,
      celebImage
    }
    if(celebType === "cast"){
      movie.cast.push(newCeleb);
    }
    else{
      movie.crew.push(newCeleb);
    }
    await movie.save();

    res.status(201).json({
      ok : true,
      message : "celeb added successfully"
    });



  } catch (error) {
    next(error);
  }
});

// Create screen for specific movie using post
router.post('/createscreen', adminTokenHandler,async (req,res,next)=>{
  try {
    const {name,location,seats,city,ScreenType} = req.body;
    const newScreen = new Screen({
      name,
      location,
      seats,
      city:city.toLowerCase(),
      ScreenType,
      movieSchedules:[]
    })
    await newScreen.save();

    res.status(201).json({ok:true,message : "Screen added successfully"});

  } catch (error) {
    next(error);
  }
});

// Add movie schedule for specific movie using post
router.post('/addmoviescheduletoscreen', adminTokenHandler,async (req,res,next)=>{
  try{
    const {screen_Id,movie_Id,show_Time,show_Date} = req.body;
    const screen = await Screen.findById(screen_Id);
    if(!screen){
      return res.status(404).json({
        ok:false,
        message:"Screen not found"
      });
    }

    const movie = await Movie.findById(movie_Id);
    if(!movie){
      return res.status(404).json({ok:false,message:"Movie not found."});
    }

    screen.movieSchedules.push({
      movie_Id,
      show_Time,
      notAvailableSeats: [],
      show_Date
    });

    await screen.save();

    res.status(201).json({
      ok: true,
      message: "Movie schedule added successfully"
  });
    
  }catch(error){
    next(error);
  }

});

// ------------------------------------------------------------------------------------------------

// user access
// calculate bookticket price using post
router.post('/bookticket', authTokenHandler,async (req,res,next)=>{
  try{
    const {show_Time,show_Date,movie_Id,seats,totalPrice,payment_Id,Payment_Type,screen_Id} = req.body;

    //find screen first
    const screen = await Screen.findById(screen_Id);

    if(!screen){
      return res.status(404).json(
        {ok:false,
        message : "Screen not found"}
      );
    }

    // check schedule is have or not
    const movieSchedule = screen.movieSchedules.find(schedule => {
      console.log(schedule);
      let showDate1 = new Date(schedule.show_Date);
      let showDate2 = new Date(show_Date);
      if (showDate1.getDay() === showDate2.getDay() &&
          showDate1.getMonth() === showDate2.getMonth() &&
          showDate1.getFullYear() === showDate2.getFullYear() &&
          schedule.show_Time === show_Time &&
          schedule.movie_Id == movie_Id) {
          return true;
      }
      return false;
    });

    if(!movieSchedule){
      return res.status(404).json({
        ok:false,
        message : "movie schedule not found"
      });
    }

    const user = await User.findById(req.userId);
    if(!user){
      return res.status(404).json({ok : false,message:"User not found"});
    }

    // create function to varify payment id
    const newbooking = new Booking({
      userId : req.userId,
      show_Time,
      show_Date,
      movie_Id,
      seats,
      totalPrice,
      payment_Id,
      Payment_Type,
      screen_Id
    });
    await newbooking.save();

    // const seat_Ids = seats.map(seat => seat.seat_Id);

    movieSchedule.notAvailableSeats.push(...seats);
    await screen.save();
    console.log("Screen Saved.");

    user.booking.push(newbooking._id);
    await user.save();

    console.log('user saved');
    res.status(201).json({
      ok:true,
      message: "Booking Successfully"
    });

  }catch(error){
    next(error);
  }
});

// get movies using get method
router.get('/movies',async (req,res,next)=>{
  try{
    const movies = await Movie.find();

    // Return the list of movies as JSON responce
    res.status(200).json({
      ok : true,
      data : movies,
      message : 'Movie retrieve successfully'
    });

  }catch(error){
    next(error);
  }
});

// get movies by id using get method
router.get('/movies/:id',async (req,res,next)=>{
  try{
    const movie_Id = req.params.id;
    const movie = await Movie.findById(movie_Id);
    if(!movie){
      return res.status(404).json({
        ok : false,
        message : 'Movie not found'
      });
    }

    res.status(200).json({
      ok:true,
      data : movie,
      message: 'Movie retrieve successfully'
    });

  }catch(error){
    next(error);
  }
});

// get Screens using get method
router.get('/screensbycity',async (req,res,next)=>{
  const city = req.body.city.toLowerCase();
  
  try{
    const screens = await Screen.find({city});
    if(!screens || screens.length === 0){
      return res.status(404).json(createResponce(false, 'No Screen found in the specific city',null));
    }
    
    return res.status(200).json(createResponce(true,'Screens retrieved successfully',screens));
  }catch(error){
    next(error);
  }
});

// // get scheduling using get method
// router.get('/getmovieschedule', adminTokenHandler,async (req,res,next)=>{});

router.get('/screensbymovieschedule/:city/:date/:movieid', async (req, res, next) => {
  try {
      const city = req.params.city.toLowerCase();
      const date = req.params.date;
      const movieId = req.params.movieid;

      // Retrieve screens for the specified city
      const screens = await Screen.find({ city });

      // Check if screens were found
      if (!screens || screens.length === 0) {
          return res.status(404).json(createResponce(false, 'No screens found in the specified city', null));
      }

      // Filter screens based on the movieId
      // const filteredScreens = screens.filter(screen =>
      //     screen.movieSchedules.some(schedule => schedule.movieId == movieId)
      // );


      let temp = []
      // Filter screens based on the showDate
      const filteredScreens = screens.forEach(screen => {
          // screen 

          screen.movieSchedules.forEach(schedule => {
              let showDate = new Date(schedule.show_Date);
              let bodyDate = new Date(date);
              // console.log(showDate , bodyDate);
              if (showDate.getDay() === bodyDate.getDay() &&
                  showDate.getMonth() === bodyDate.getMonth() &&
                  showDate.getFullYear() === bodyDate.getFullYear() &&
                  schedule.movie_Id == movieId) {
                  temp.push(
                      screen
                  );
              }
          })
      }
      );

      console.log(temp);

      res.status(200).json(createResponce(true, 'Screens retrieved successfully', temp));

  } catch (err) {
      next(err); // Pass any errors to the error handling middleware
  }
});

router.get('/schedulebymovie/:screenid/:date/:movieid', async (req, res, next) => {
  const screenId = req.params.screenid;
  const date = req.params.date;
  const movieId = req.params.movieid;

  const screen = await Screen.findById(screenId);

  if (!screen) {
      return res.status(404).json(createResponce(false, 'Screen not found', null));
  }

  const movieSchedules = screen.movieSchedules.filter(schedule => {
      let showDate = new Date(schedule.show_Date);
      let bodyDate = new Date(date);
      if (showDate.getDay() === bodyDate.getDay() &&
          showDate.getMonth() === bodyDate.getMonth() &&
          showDate.getFullYear() === bodyDate.getFullYear() &&
          schedule.movie_Id == movieId) {
          return true;
      }
      return false;
  });
  console.log(movieSchedules)

  if (!movieSchedules) {
      return res.status(404).json(createResponce(false, 'Movie schedule not found', null));
  }

  res.status(200).json(createResponce(true, 'Movie schedule retrieved successfully', {
      screen,
      movieSchedulesforDate: movieSchedules
  }));

});

router.get('/getuserbookings' , authTokenHandler , async (req , res , next) => {
  try {
      const user = await User.findById(req.userId).populate('booking');
      if(!user){
          return res.status(404).json(createResponce(false, 'User not found', null));
      }

      let bookings = [];
      // user.bookings.forEach(async booking => {
      //     let bookingobj = await Booking.findById(booking._id);
      //     bookings.push(bookingobj);
      // })

      for(let i = 0 ; i < user.booking.length ; i++){
          let bookingobj = await Booking.findById(user.booking[i]._id);
          bookings.push(bookingobj);
      }

      res.status(200).json(createResponce(true, 'User bookings retrieved successfully', bookings));
      // res.status(200).json(createResponse(true, 'User bookings retrieved successfully', user.bookings));
  } catch (err) {
      next(err); // Pass any errors to the error handling middleware
  }
})

router.get('/getuserbookings/:id' , authTokenHandler , async (req , res , next) => {
  try {
      const bookingId = req.params.id;
      const booking = await Booking.findById(bookingId);

      if(!booking){
          return res.status(404).json(createResponce(false, 'Booking not found', null));
      }

      res.status(200).json(createResponce(true, 'Booking retrieved successfully', booking));
  } catch (err) {
      next(err); // Pass any errors to the error handling middleware
  }
})

router.use(errorHandler);

module.exports = router;
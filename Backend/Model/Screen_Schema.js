const mongoose = require('mongoose');

const screenSchema = new mongoose.Schema({
  name : {type : String , required : true},
  location : {type : String , required : true},
  seats : {type : Array , required : true},
  city : {type : String , required : true},
  ScreenType : {type : String , required : true},
  movieSchedules : [
    {
      movie_Id : {type : mongoose.Schema.Types.ObjectId , ref : 'Movie' , required :true },
      show_Time : String,
      notAvailableSeats : [{
        row : String,
        col : Number,
        seat_Id : String,
        price : Number
      }],
      show_Date : {type : Date , required : true},
    },
  ],
});

module.exports = mongoose.model('Screen',screenSchema);
module.exports = app => {
  const genres = require("../controllers/genreController");
  const actors = require("../controllers/actorController");
  const movies = require("../controllers/movieController");

  // Get All Genres
  app.get("/getGenres/:token", genres.findAll);

  //Save Actor
  app.post("/saveActor", actors.create);
  //Get All Actors
  app.get("/getActors/:token", actors.findAll);
   //Get Cast For A moview
   app.get("/getCast/:token/:cast", actors.findCast);
  //Update Actor
  app.post("/updateActor", actors.update);

  //Save Movie
  app.post("/saveMovie", movies.create);
  //Get All Movies
  app.get("/getMovies/:token", movies.findAll);
   //Get All Movies
   app.get("/getMovieById/:token/:movieId", movies.findById);
  //Update Movie
  app.post("/updateMovie", movies.update);
};
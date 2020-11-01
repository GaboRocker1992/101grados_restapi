const sql = require("../config/dbConnecter");

const Movie = function(movie) {
    this.token = movie.token;
    this.id = movie.id;
    this.name = movie.name;
    this.duration = movie.duration;
    this.genre = movie.genre;
    this.sinopsis = movie.sinopsis;
    this.cast = movie.cast;
};


Movie.create = (newMovie, result) => {
    sql.query("INSERT INTO movies(name, duration, genre, sinopsis, cast) values (?, ?, ?, ?, ?)", [newMovie.name, newMovie.duration, newMovie.genre, newMovie.sinopsis, newMovie.cast], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { id: 1, ...newMovie });
    });
};

Movie.getAll = result => {
    sql.query("SELECT * FROM movies where status = 1", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Movie.getById = (movieId, result) => {
    sql.query("SELECT * FROM movies where status = 1 and id = ?",[movieId], (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
        }
      
        if (res.length) {
            console.log("found customer: ", res[0]);
            result(null, res);
            return;
        }
      
        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

Movie.update = (newMovie, result) => {
    sql.query("Update movies set name = ?, duration = ?, genre = ?, sinopsis = ?, cast = ?, updated_at = CURRENT_TIMESTAMP() Where id = ?", [newMovie.name, newMovie.duration, newMovie.genre, newMovie.sinopsis, newMovie.cast, newMovie.id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      result(null, { id: 0, ...newMovie });
    });
};

module.exports = Movie;
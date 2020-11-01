const sql = require("../config/dbConnecter");

// constructor
const Genre = function(genre) {
    this.genre_name = genre.genre_name;
    this.description = genre.description;
    this.status = genre.status;
};

Genre.getAll = result => {
    sql.query("SELECT * FROM genres where status = 1", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      result(null, res);
    });
};

module.exports = Genre;
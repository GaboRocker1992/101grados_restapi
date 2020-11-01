const sql = require("../config/dbConnecter");

const Actor = function(actor) {
  this.token = actor.token;
  this.id = actor.id;
  this.actor_name = actor.actor_name;
  this.age = actor.age;
  this.url_photo = actor.url_photo;
};


Actor.create = (newActor, result) => {
  sql.query("INSERT INTO actors(actor_name, age, url_photo) values (?, ?, ?)", [newActor.actor_name, newActor.age, newActor.url_photo], (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, { id: 1, ...newActor });
  });
};

Actor.getAll = result => {
  sql.query("SELECT * FROM actors where status = 1", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

Actor.getCastForAMoview = (cast, result) => {
  sql.query("SELECT * FROM actors where id in (?)", [cast.split(",")], (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

Actor.update = (newActor, result) => {
  sql.query("Update actors set actor_name = ?, age = ?, url_photo = ?, updated_at = CURRENT_TIMESTAMP() Where id = ?", [newActor.actor_name, newActor.age, newActor.url_photo, newActor.id], (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, { id: 0, ...newActor });
  });
};

module.exports = Actor;
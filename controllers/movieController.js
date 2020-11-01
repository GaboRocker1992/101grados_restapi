const Movies = require("../models/movieModel");
const getToken = require("../config/security");
const Strings = require("../utils/strings");

exports.create = (req, res) => {
    //method answer
    let response = {
      header: Strings.headerAccessDenied,
      message: Strings.responseAccessDenied,
      body: [],
      size: 0
    }
    
    //Verifying if exists parameters from post request
    if (req.body != null) {
        // Creating Movie Entity
        const movie = new Movies({
            token: req.body.token,
            id: 0,
            name: req.body.name,
            duration: req.body.duration,
            genre: req.body.genre,
            sinopsis: req.body.sinopsis,
            cast: req.body.cast
        });
        
        if(req.body.token == getToken.getToken){
            //Calling method from model
            Movies.create(movie, (error, data) => {
                if (error){
                    response.header = Strings.headerError;
                    response.message = Strings.responseError + " " + error.message
                    res.status(500).send(response);
                }else{
                    response.header = Strings.headerOK;
                    response.message = Strings.responseOK;
                    response.size = 1; 
                    res.send(response);
                }
            });
        }else{
            response.message = Strings.responseInvalidToken;
            res.status(500).send({response});
        }
    }else{
      res.status(500).send({response});
    }
};

//Get All Movies
exports.findAll = (req, res) => {
    //method answer
    let response = {
        header: Strings.headerAccessDenied,
        message: Strings.responseAccessDenied,
        body: [],
        size: 0
    }
   
    //asking if token exists
    if(req.params.token){
        //verifying if token is correct
        if(getToken.getToken == req.params.token){
            //Calling method from model
            Movies.getAll((error, data) => {
                if (error){
                    response.header = Strings.headerError;
                    response.message = Strings.responseError + " " + error.message
                    res.status(500).send({response});
                }else{
                    if(data.length > 0){
                        response.header = Strings.headerOK;
                        response.message = Strings.responseOK;
                        response.body = data;
                        response.size = data.length;
                        res.send(response);
                    }else{
                        response.header = Strings.headerDataNotFound;
                        response.message = Strings.responseDataNotFound;
                        res.status(500).send({response});
                    }
                }
            });
        }else{
            response.message = Strings.responseInvalidToken;
            res.status(500).send({response});
        }
    }else{
        res.status(500).send({response});
    }
};
  
//Update Movie
exports.update = (req, res) => {
    //method answer
    let response = {
      header: Strings.headerAccessDenied,
      message: Strings.responseAccessDenied,
      body: [],
      size: 0
    }
    
    //Verifying if exists parameters from post request
    if (req.body != null) {
      // Creating Movie Entity
        const movie = new Movies({
            token: req.body.token,
            id: req.body.id,
            name: req.body.name,
            duration: req.body.duration,
            genre: req.body.genre,
            sinopsis: req.body.sinopsis,
            cast: req.body.cast
        });
  
        if(movie.token == getToken.getToken){
            //Calling method from model
            Movies.update(movie, (error, data) => {
            if (error){
                if (error.kind === "not_found") {
                    response.header = Strings.headerDataNotFound;
                    response.message = Strings.responseDataNotFound;
                    res.status(500).send({response});
                }else{
                    response.header = Strings.headerError;
                    response.message = Strings.responseError + " " + error.message
                    res.status(500).send(response);
                }
            }else{
                response.header = Strings.headerOK;
                response.message = Strings.responseOK;
                response.size = 1; 
                res.send(response);
            }
            });
        }else{
            response.message = Strings.responseInvalidToken;
            res.status(500).send({response});
        }
    }else{
      res.status(500).send({response});
    }
};


exports.findById = (req, res) => {
    //method answer
    let response = {
        header: Strings.headerAccessDenied,
        message: Strings.responseAccessDenied,
        body: [],
        size: 0
    }
   
    //asking if token exists
    if(req.params.token){
        //verifying if token is correct
        if(getToken.getToken == req.params.token){
            //Calling method from model
            Movies.getById(req.params.movieId, (error, data) => {
                if (error){
                    if (error.kind === "not_found") {
                        response.header = Strings.headerDataNotFound;
                        response.message = Strings.responseDataNotFound;
                        res.status(500).send({response});
                    }else{
                        response.header = Strings.headerError;
                        response.message = Strings.responseError + " " + error.message
                        res.status(500).send(response);
                    }
                }else{
                    if(data.length > 0){
                        response.header = Strings.headerOK;
                        response.message = Strings.responseOK;
                        response.body = data;
                        response.size = data.length;
                        res.send(response);
                    }else{
                        response.header = Strings.headerDataNotFound;
                        response.message = Strings.responseDataNotFound;
                        res.status(500).send({response});
                    }
                }
            });
        }else{
            response.message = Strings.responseInvalidToken;
            res.status(500).send({response});
        }
    }else{
        res.status(500).send({response});
    }
};
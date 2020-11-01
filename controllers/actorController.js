const Actors = require("../models/actorModel");
const getToken = require("../config/security");
const Strings = require("../utils/strings");

//Save Actor
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
    // Creating Actor Entity
    const actor = new Actors({
      token: req.body.token,
      id: 0,
      actor_name: req.body.actor_name,
      age: req.body.age,
      url_photo: req.body.url_photo
    });

    if(actor.token == getToken.getToken){
      //Calling method from model
      Actors.create(actor, (error, data) => {
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

//Get All Actors
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
          Actors.getAll((error, data) => {
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


//Get All Actors
exports.findCast = (req, res) => {
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
          Actors.getCastForAMoview(req.params.cast, (error, data) => {
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


//Update Actor
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
    // Creating Actor Entity
    const actor = new Actors({
      token: req.body.token,
      id: req.body.id,
      actor_name: req.body.actor_name,
      age: req.body.age,
      url_photo: req.body.url_photo
    });

    if(actor.token == getToken.getToken){
      //Calling method from model
      Actors.update(actor, (error, data) => {
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
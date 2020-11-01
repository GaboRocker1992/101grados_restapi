const Genres = require("../models/genreModel");
const getToken = require("../config/security");
const Strings = require("../utils/strings");

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
            Genres.getAll((error, data) => {
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
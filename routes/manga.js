const express=require('express');
const router=express.Router();
MangaSchema = require('../models/manga');

function HandleError(response, reason, message, code) {
    console.log("ERROR: " + reason);
    response.status(code || 500).json({"error": message});
}

router.get('/', (request, response, next) => {
    MangaSchema
        .find({})
        .then( (data) => {
            response.status(200).json(data);
        })
        .catch( (error) => {
            response.status(500).json(error);
        });
});

router.post('/', (request, response) => {
    const mangaJSON = request.body;
    if (!mangaJSON.title || !mangaJSON.volume || !mangaJSON.author || !mangaJSON.year) {
        return HandleError(response, "Invalid user input", "Must provide a title, volume, author, and year.", 400);
    }else{
        MangaSchema
            .create(mangaJSON)
            .then( (data) => {
                response.status(201).json(data);
            })
            .catch( (error) => {
                response.status(500).json(error);
            }); 
    }
});

module.exports = router;

const express=require('express');
const router=express.Router();
MangaSchema = require('../models/manga');

function HandleError(response, reason, message, code) {
    console.log("ERROR: " + reason);
    response.status(code || 500).json({"error": message});
}

router.get('/', (request, response) => {
    MangaSchema.find().exec( (error, mangas) => {
        if (error) {
            return HandleError(response, error.message, "Failed to get mangas.");
        }
        response.send(mangas);
    })
});

router.post('/', (request, response) => {
    const mangaJSON = request.body;
    if (!mangaJSON.title || !mangaJSON.volume || !mangaJSON.author || !mangaJSON.year) {
        return HandleError(response, "Invalid user input", "Must provide a title, volume, author, and year.", 400);
    }else{
        const manga = new MangaSchema(mangaJSON);
        manga.save( (error) => {
            if (error) {
                response.send({"error": error});
            }else{
                response.status(201).send(manga);
            }
        })
    }
})
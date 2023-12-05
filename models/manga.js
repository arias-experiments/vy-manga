const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MangaSchema = new Schema({
    title: String,
    volume: Number,
    author: String,
    year: Number
});

module.exports = mongoose.model('Manga', MangaSchema);
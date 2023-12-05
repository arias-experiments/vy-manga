const express=require('express');
const bodyParser=require('body-parser');

const app=express();

const db=require('./database');

const mangaRouter=require('./routes/manga');

app.use(bodyParser.urlencoded({extended: true}));
app.use('/manga', mangaRouter);

app.listen(8001, () => {
    console.log("Server is running on port 8001");
});

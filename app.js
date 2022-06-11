const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const appRoute = require('./src/routes/route');
const imageRoute = require('./src/routes/images');

app.use('/', appRoute);
app.use("/images", imageRoute)
app.listen(1233, ()=>{
    console.log('Server Berjalan di Port : 1233');
});
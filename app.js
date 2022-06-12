const express = require('express');
const bodyParser = require('body-parser');
const port = 8080
const cors = require('cors')
const app = express();


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const appRoute = require('./src/routes/route');

app.use(cors({

    origin: 'http://34.128.100.77/'

}))

app.use('/', appRoute);
app.use('/images', express.static('images'));

app.listen(port, ()=>{
    console.log('Server Berjalan di Port : ${port}');
});
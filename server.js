require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const cron = require('node-cron');
const scraper = require('./scraper');
const { Story } = require('./models');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, { useMongoClient: true });

const app = express();

app.use(bodyParser.json());

app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout: 'main'}));
app.set('view engine', '.hbs');

app.use(require('./routes')(express));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

cron.schedule('15 * * * *', function() {
  scraper.scrape(Story);
});

scraper.scrape(Story);

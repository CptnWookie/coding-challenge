const express = require('express');
const path = require('path');
const data = require('./assets/data/techbuzzwordslist.json');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static('public'));

app.use('/ninjify', (req, res) => {
    const firstName = data[Math.round(Math.random() * data.length)];
    const lastName = data[Math.round(Math.random() * data.length)];
    return res.json({ firstName, lastName });
});

app.use('/', (req, res) => {
    return res.render('index');
});

module.exports = app
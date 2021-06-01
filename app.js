//express  фреймворк для создание сервер
const express = require('express');
//config  библиотека для создание константы
const config = require('config');
//mongoose библиотека для работа с MongoDB
const mongoose = require('mongoose');
const path = require('path');


/*
Через библиотека config я создал константы(mongoUri, port и jwtSecret) в "../config/default.json" 
и там сохранил api для MongoDB, порт и секрет ключ 
*/
const PORT = config.get('port') || 5000;
const app = express();

app.use(express.json({ extended: true }));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/links', require('./routes/link.routes'));
app.use('/t', require('./routes/redirect.routes'));

if (process.env.NODE_ENV === 'production') {
app.use('/', express.static(path.join(_dirname, 'client', 'build')));
app.get('*', (request, response) => {
response.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
});

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));
    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1);
    }
}

start();
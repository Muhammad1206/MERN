const { request } = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (request, response, next) => {
    if(request.method === 'OPTIONS') {
     return next();
    }
    try {
        const token = request.headers.authorization.split(' ')[1];
        if(!token) {
         return response.status(401).json({message: 'Нет авторизации'});
        }
        /* 
         decoded через функция verify() (от библиотека jsonwebtoken)
         делает раскодировка токенов 
         тут jwtSecret секреть ключ для кодировка и раскодировка токенов
         */
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        request.user = decoded;
        next()
    }catch (e) {
        response.status(401).json({message: 'Нет авторизации'});
    }
}
const {Router} = require('express');
const User = require('../models/User');
//express-validator для создание ошибки
const {check, validationResult} = require('express-validator');
//jsonwebtoken библиотека для генирировать токенов
const jwt = require('jsonwebtoken');
const config = require('config');
//bcryptjs  для зашифровать пароль users
const bcrypt = require('bcryptjs');
const router = Router();


// /api/auth/register
router.post('/register',
    [
        check('email', 'Некоректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({min:6})
    ],
    async (request, response) => {
        try {
            const errors = validationResult(request);

            if (!errors.isEmpty()) {
                return response.status(400).json({
                    errors: errors.array(),
                    message: 'Некоректный данные при регистрации'
                })
            }

            const {email, password} = request.body
            const candidate = await User.findOne({email});

            if (candidate) {
                return response.status(400).json({message: 'Такой пользователь уже существует'});
            }
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({email, password: hashedPassword});

            await user.save();
            response.status(201).json({message: 'Пользователь создан'})

        } catch (e) {
            response.status(500).json({message: "Что-то пошло не так, поробуйте снова"})
        }
    })
// /api/auth/login
router.post('/login',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (request, response) => {
        try {
            const errors = validationResult(request);

            if (!errors.isEmpty()) {
                return response.status(400).json({
                    errors: errors.array(),
                    message: 'Некоректный данные при входе в систему'
                })
            }

            const {email, password} = request.body;
            const user = await  User.findOne({email})

            if (!user) {
                return response.status(400).json({message: 'Пользователь не найден'})
            }

            //Переменния isMatch через функция compare от библиотека bcryptjs сравнивает пароль

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                response.result(400).json({
                    message: 'Неверный пароль, попробуйте сново'
                })
            }
            const token =  jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )
            response.json({token, userId: user.id})

        } catch (e) {
            response.status(500).json({message: "Что-то пошло не так, поробуйте снова"})
        }

    })


module.exports = router;
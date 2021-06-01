const {Router} = require('express');
const Link = require('../models/Link');
const router = Router();

router.get('/:code', async (request, response) => {
    try {
        const links = await Link.findOne({code: request.params.code});
        if (links) {
            links.clicks ++;
            await links.save();
            return response.redirect(links.from)
        }
        response.status(404).json('Ссылка не найдена')
    } catch (e) {
        response.status(500).json({message: "Что-то пошло не так, поробуйте снова"});
    }
});
module.exports = router;
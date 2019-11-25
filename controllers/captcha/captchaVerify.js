const SECRET_KEY = require('../../config/secretKey'),
    request      = require('request')

module.exports = (req, res) => {
    if (!req.body.captcha) {
        return res.json({'msg': 'captcha token is undefined'});
    }
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${req.body.captcha}`;
    request(verifyUrl, (error, res, body) => {
        if (error) {
            console.log(error);
            
        }
        body = JSON.parse(body);
        if (!body.success || body.score < 0.4) {
           return res.json({'msg': 'You might be a robot, sorry!! You are banned!', 'score': body.score});
        }
        return res.json({'msg': 'You have been verified! You may proceed!', 'score': body.score});
    })
}
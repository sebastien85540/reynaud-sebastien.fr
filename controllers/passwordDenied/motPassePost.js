// Mot de passe oublié
const User = require('../../database/models/user'),
    mailSender = 'sebastien.reynaud85@outlook.fr',
    mailPassword = require('../../config/mailPassword'),
    nodemailer = require('nodemailer');
    module.exports = (req, res, next) => {
        //    console.log(req.body)
        //    console.log("email : " + req.body.email)
User.findOne({
    email: req.body.email
}, (err, user) => {
    if (err || !user) {
        // req.flash('error', 'Erreur : Aucun utilisateur n\'a été trouvé pour cette adresse mail')
        res.redirect('/user/create')
    } else {

        async function myCustomMethod(ctx) {
            let cmd = await ctx.sendCommand(
                'AUTH PLAIN ' +
                Buffer.from(
                    '\u0000' + ctx.auth.credentials.user + '\u0000' + ctx.auth.credentials.password,
                    'utf-8'
                ).toString('base64')
            );

            if (cmd.status < 200 || cmd.status >= 300) {
                throw new Error('Failed to authenticate user: ' + cmd.text);
            }
        }
        const transporter = nodemailer.createTransport({
                           host: "SMTP.office365.com",
                           port: 587,
                           secure: false, // true for 465, false for other ports
                           auth: {
                               user: 'sebastien.reynaud85@outlook.fr', // generated ethereal user
                               pass: mailPassword.MAILPASSWORD, // generated ethereal password
            
                           },
                           tls: {
                               rejectUnauthorized: true
                           }
        });
        // const lnk = `${User.userId}`;
    //    const utilisateur =  User.findById(req.session.userId)

        let mailOptions = {
            from: `"reynaud-sebastien.fr"<${mailSender}>`,
               to: req.body.email, // sender address
            // to: user.email, // list of receivers
            subject: "Mot de passe oublié", // Subject line
            text: `Bonjour ${user.firstname} !\n
                Pour réinitialiser votre mot de passe, veuillez cliquer le lien suivant, ou le copier dans la barre d'url de votre navigateur.\n
                reynaud-sebastien.fr/user/password/edit/${user._id}`, // plain text body
            html: `<h1>Bonjour ${user.firstname} !</h1>
                <p>Pour réinitialiser votre mot de passe, veuillez cliquer le lien suivant, ou le copier dans la barre d\'url de votre navigateur.</p>\
                       <a href="https://reynaud-sebastien.fr/user/password/edit/${user._id}">reynaud-sebastien.fr/user/password/edit/${user._id}</a>` // html body
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.redirect('/mot-passe-oublie')
            } else {
                console.log('message sent: Votre email a été envoyé');
                res.redirect('/')
            }
        })
    }
})}

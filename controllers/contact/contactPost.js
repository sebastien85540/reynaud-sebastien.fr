const mailSender              = 'surfcastingdu85@gmail.com'
    , mailReceiver            = 'sebastien.reynaud85@outlook.fr'
    , mailPassword            = require('../../config/mailPassword')
    , nodemailer              = require('nodemailer');

module.exports = (req, res) => {
    console.log(req.body);
   
    const output = `
    <h1>Nouvelle requète de contact</h1>
    <h3>Détails</h3>
    <ul>
    <li>Nom: ${req.body.lastname}</li>
    <li>Prénom: ${req.body.firstname}</li>
    <li>Email: ${req.body.email}</li>
    <li>Tel: ${req.body.phone}</li>
    <li>Adresse: ${req.body.address}</li>
    <li>Complement: ${req.body.address2}</li>
    <li>CP: ${req.body.cp}</li>
    <li>Ville: ${req.body.city}</li>
    <li>Objet: ${req.body.select}</li>
    </ul>
    <h3>Message: </h3>
    <p>${req.body.message}</p>
    `;
    
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: mailSender, // generated ethereal user
            pass: mailPassword.MAILPASSWORD, // generated ethereal password
            
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    
    // send mail with defined transport object
    let mailOptions = {
        // reynaud-sebastien.fr
        from: `"reynaud-sebastien.fr" <${mailSender}>`, // sender address
        to: `${mailReceiver}`, // list of receivers
        subject: req.body.select, // Subject line
        text: "reynaud-sebastien.fr", // plain text body
        html: output, // html body
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                    return console.log(error);
                }
            })
            // verify connection configuration
        transporter.verify(function(error, success) {
            if (error) {
              console.log(error);
            } else {
              console.log("le message est parti");
              res.redirect('/')
            }
          });
}
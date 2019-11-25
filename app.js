// MODULES
const express       = require('express'),
    exphbs          = require('express-handlebars'),
    mongoose        = require('mongoose'),
    bodyParser      = require('body-parser'),
    fileupload      = require('express-fileupload'),
    expressSession  = require('express-session'),
    MongoStore      = require('connect-mongo');
    // Recaptcha       = require('recaptcha').Recaptcha;

// CONTROLLERS

// HOME PAGE
const homePage      = require('./controllers/homePage')
// USER
const userCreate    = require('./controllers/user/userCreate'),
    userRegister    = require('./controllers/user/userRegister'),
    login           = require('./controllers/user/login'),
    userLoginAuth   = require('./controllers/user/userLoginAuth'),
    profil          = require('./controllers/user/profil'),
    userLogout      = require('./controllers/user/userLogout'),
    userDelete      = require('./controllers/user/userDelete');

// MOT DE PASSE OUBLIE
const passeOublie   = require('./controllers/passwordDenied/motPasse'),
    passeOubliePost = require('./controllers/passwordDenied/motPassePost'),
    editPass        = require('./controllers/passwordDenied/userPassEdit'),
    editPassPost    = require('./controllers/passwordDenied/userPassEditPost');
// ARTICLES
const articleAdd    = require('./controllers/articles/articleAdd'),
    articleSingle   = require('./controllers/articles/articleSingle'),
    articlePost     = require('./controllers/articles/articlePost'),
    articlesPage    = require('./controllers/articles/articlesPage'),
    articleEdit     = require('./controllers/articles/articleEdit'),
    articleEditPost = require('./controllers/articles/articleEditPost'),
    articleDelete   = require('./controllers/articles/articleDelete');
// CONTACT
const contact       = require('./controllers/contact/contact')
    , contactPost   = require('./controllers/contact/contactPost')
// CAPTCHA
// const captchaVerify   = require('./controllers/captcha/captchaVerify');

// MON CV
const monCv         = require('./controllers/monCv')
// ERROR
const error         = require('./controllers/error')
const app           = express();
// PORT
port = 3000
// RECAPTCHA
// var PUBLIC_KEY      = require('./config/index.php').SITE_KEY ,
//     PRIVATE_KEY     = require('./config/index.php').SECRET_KEY;
// MONGO DB
const db = require('./config/keys').MongoURI
// mongoose
mongoose
    .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => console.log('connecter a mongocloud'))
    .catch(error => console.log(error))
// MONGO STORE
const mongoStore = MongoStore(expressSession)
//EXPRESS SESSION
app.use(expressSession({
    secret: 'securite',
    name: 'cookie',
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}))
// AUTHENTIFICATION

const auth = require('./middleware/auth'),
    redirectAuthSuccess = require('./middleware/redirectAuthSuccess')
// MIDDLEWARE
const articleValidPost = require('./middleware/articleValidPost')
app.use('/article/add/post', articleValidPost)
app.use('/article/add', auth)
// BODY PARSER
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
// FILE UPLOAD
app.use(fileupload())
// HANDLEBARS
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use('*', (req, res, next) => {
    res.locals.user = req.session.userId;
    console.log(res.locals.user);

    next()
})

// MOMENT

var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);
// STATIC
app.use(express.static('public'));
// ROUTES
// HOME
app.get("/", homePage)                                          // PAGE D'ACCUEIL

// USER

// GET
app.get('/user/create', redirectAuthSuccess, userCreate)        // PAGE DE CREATION DE COMPTE
app.get('/user/login', redirectAuthSuccess, login)              // PAGE DE CONNEXION
app.get('/profil', auth, profil)                                // PAGE DE PROFIL
app.get('/user/logout', userLogout)
app.get('/user/delete', userDelete, redirectAuthSuccess)                             // DECONNEXION DU PROFIL

//POST
app.post('/user/register', redirectAuthSuccess, userRegister)   // ENREGISTREMENT D'USER
app.post('/user/loginAuth', redirectAuthSuccess, userLoginAuth) // VALIDATION DE CONNEXION
// ARTICLES

// GET
app.get('/articles', articlesPage)                              // PAGE DES ARTICLES
app.get('/article/add', auth, articleAdd)                       // AJOUT ARTICLE
app.get('/article/:id', articleSingle)                          // PAGE D'UN ARTICLE
app.get('/article/edit/:id', articleEdit)                       // PAGE D'EDITION D'ARTICLE
app.get('/article/delete/:id', articleDelete)                   // SUPPRESSION D'UN ARTICLE

//POST
app.post('/article/post', auth, articleValidPost, articlePost)  // POST ARTICLE
app.post('/article/edit/post/: id', articleEditPost)            // POST EDIT ARTICLE
// CONTACT
app.get('/contact', contact)                                    // PAGE CONTACT
app.post('/contact/post', contactPost)
// CAPTCHA
// app.post('/verify', captchaVerify)
// MON CV
app.get('/mon_cv', monCv)
// PASSE OUBLIE
app.get('/passe-oublie', passeOublie)
app.post('/passe-oublie/post', passeOubliePost) 
app.get('/user/password/edit/:id', editPass) 
app.post('/user/password/edit/post', editPassPost)                                     // PAGE CV
// ERROR 
app.use(error)                                                  // UTILISATION PAGE ERREUR 404 
// LISTEN
app.listen(port, () => {
    console.log("server start port 3000");

})
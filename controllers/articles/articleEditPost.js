const Article = require("../../database/models/Article")
    , path    = require('path');


module.exports = (req, res) => {
    // const Article = require("./database/models/Article")
    //     , path    = require('path');
    
let article = 
// Article.findById(req.params.id)
{
    _id: req.params.id
}
console.log("ok");

console.log(article);
console.log("c'est bon");

const {image} = req.files// met l'image dans un objet
const uploadFile = path.resolve(__dirname, '../..','public/articles', image.name);// recupere l'image pour l'envoyer dans le dossier public

image.mv(uploadFile, (error) => {
    Article.findByIdAndUpdate(article,{
        ...req.body,
        image: `/articles/${image.name}`
    },
    function (error, post) {
        if (error) {
            console.log(error);
            console.log(req.body);
            
            return;
        } else {
            console.log(article);
            
            res.redirect('/articles');
        }
    });
})

}
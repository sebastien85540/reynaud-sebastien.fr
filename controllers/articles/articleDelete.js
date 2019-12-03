const Article = require ('../../database/models/Article')

module.exports = async (req, res) => {
    articleDelete = await Article.findById(req.params.id);
    // console.log(req.params.id);

    Article.findByIdAndDelete(articleDelete, function (error) {
        if (error) {
            throw error;
        }
    })
   res.redirect('/profil') 
}
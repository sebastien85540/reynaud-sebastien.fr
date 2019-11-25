const Post = require('../../database/models/Article')

module.exports = async (req, res) => {
    const title = "page d'articles"
        , posts = await Post.find({}).sort({_id:-1}).limit(30)
        res.render('articles/articlesPage', {posts, title})
}
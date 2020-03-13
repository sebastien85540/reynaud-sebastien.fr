const Post = require ('../database/models/Article.js')

module.exports = async (req, res) => {
    const title = "page d'accueil"
    const posts = await Post.find({}).sort({_id:-1}).limit(3)
    res.render('index', {posts,title})
}
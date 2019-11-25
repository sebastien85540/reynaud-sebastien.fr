const Post = require('../../database/models/Article')

module.exports =  async (req,res) =>{
    const title = "article"
    const article = await Post.findById(req.params.id)
    res.render('articles/article', {article, title})
}
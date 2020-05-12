const Post = require ('../../database/models/Article')
    , User = require ('../../database/models/user')


module.exports = async (req, res) => {
    const title = "page de profil"
        , posts = await Post.find(req.params.id).sort({_id:-1})
        , user = await User.findById(req.session.userId)
        console.log(req.session.userId);
        
    res.render('user/profil', {user, posts, title})
}
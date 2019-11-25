module.exports =  (req, res) => {
    const title = "ajout d'article"
    if (req.session.userId) {
        return res.render('articles/add', {title})
    }
    res.redirect('/user/login')
}
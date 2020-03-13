module.exports =  (req, res) => {
    const title = "page d'erreur"
    res.render('error', {title})
}
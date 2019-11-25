// creer un usager

module.exports = (req, res) => {
    const title = "page de creation de compte"
    // console.log(req.session.registerError);
    // console.log(req.flash('data'));
    
    res.render("user/register",{title})
}
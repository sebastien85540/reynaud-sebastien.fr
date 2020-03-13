const Edit = require ("../../database/models/Article")
    , User = require ("../../database/models/user");

module.exports = async (req,res) => {
  const title = "page d'édition d'article"
  const article = await Edit.findById(req.params.id)
  const utilisateur = await User.findById(req.session.userId)
  // console.log(req.params.id);
  // console.log(req.params.userId);
  
  

  res.render ('articles/articleEdit', {article, utilisateur, title}) 
};
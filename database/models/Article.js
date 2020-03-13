const mongoose = require ('mongoose');

const ArticleSchema = new mongoose.Schema({
        title     : String,
        image     : String,
        content   : String,
        link      : String,
        createDate: {
                type: Date,
                default: new Date()
            }
 })
const Article = mongoose.model('Article', ArticleSchema)

module.exports = Article
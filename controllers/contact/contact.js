module.exports = (req, res) => {
    const title = "page contact"
    // var onloadCallback = function() {
    //     alert("grecaptcha is ready!");
    //   };
    res.render('contact', {title})
}
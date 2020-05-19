const User = require('../models/User');

exports.login = async (req, res) => {
    let user = new User(req.body);
    try {
        const result = await user.login();
        req.session.user = {email: user.data.email};
        req.session.save(() => {
            res.redirect('/conversations');
        });
    } catch(error) {
        res.redirect('/login-page');
    }
}
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login-page');
    });
    
}
exports.register = (req, res) => {
    let user = new User(req.body);
    user.register();
    if(user.errors.length) {
        res.send(user.errors);
    } else {
        res.redirect('/conversations');
    }
}
exports.conversations = (req, res) => {
    res.render('conversations');
}
exports.loginPage = (req, res) => {
    if(req.session.user) {
        res.redirect('/conversations');
    } else {
        res.render('login-page');
    }
}
exports.registerPage = (req, res) => {
    res.render('register-page');
}
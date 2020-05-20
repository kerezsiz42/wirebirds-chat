const User = require('../models/User');

exports.login = async (req, res) => {
    let user = new User(req.body);
    try {
        await user.login();
        req.session.user = {email: user.data.email};
        req.session.save(() => {
            res.redirect('/conversations');
        });
    } catch(error) {
        req.flash('errors', error);
        req.session.save(() => {
            res.redirect('/login-page');
        });
    }
}
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login-page');
    });
    
}
exports.register = async (req, res) => {
    let user = new User(req.body);
    try {
        await user.register();
        req.session.user = {email: user.data.email};
        req.session.save(() => {
            res.redirect('/login-page');
        });
    } catch(regErrors) {
        regErrors.forEach(error => {
            req.flash('regErrors', error);
        });
        req.session.save(() => {
            res.redirect('/register-page');
        });
    }
}
exports.conversations = (req, res) => {
    res.render('conversations');
}
exports.loginPage = (req, res) => {
    if(req.session.user) {
        res.redirect('/conversations');
    } else {
        res.render('login-page', {errors: req.flash('errors')});
    }
}
exports.registerPage = (req, res) => {
    res.render('register-page', {errors: req.flash('regErrors')});
}
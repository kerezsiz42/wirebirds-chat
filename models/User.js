const bcrypt = require('bcryptjs');
const usersCollection = require('../db').db().collection('users');
const validator = require('validator');

class User {
    constructor(data) {
        this.data = data;
        this.errors = [];
    }

    cleanUp() {
        let {username, email, password} = this.data;
        if(typeof(username) != 'string') {username = ''}
        if(typeof(email) != 'string') {email = ''}
        if(typeof(password) != 'string') {password = ''}

        this.data = {
            username: username.trim().toLowerCase(),
            email: email.trim().toLowerCase(),
            password
        }
    }

    validate() {
        const {username, email, password} = this.data;
        if(username == "") {this.errors.push('You must provide a username.')}
        if(!validator.isEmail(email)) {this.errors.push('You must provide a valid email.')}
        if(password == "") {this.errors.push('You must provide a password.')}

        if(username != "" && !validator.isAlphanumeric(username)) {this.errors.push('Username can only contain letters and numbers.')}

        if(password.length > 0 && password.length < 8) {this.errors.push('Password should be at least 8 characters long.')}
        if(password.length > 50) {this.errors.push('Password cannot exceed 50 characters.')}
        if(username.length > 0 && password.length < 3) {this.errors.push('Username should be at least 3 characters long.')}
        if(password.length > 30) {this.errors.push('Username cannot exceed 30 characters.')}
    }

    register() {
        const {username, email, password} = this.data;
        this.cleanUp();
        this.validate();

        if(!this.errors.length) {
            this.data.password = bcrypt.hashSync(password, 10);
            usersCollection.insertOne(this.data);
        }
    }

    login() {
        const {username, email, password} = this.data;
        return new Promise(async (resolve, reject) => {
            this.cleanUp();
            try {
                const foundUser = await usersCollection.findOne({email});
                if(foundUser && bcrypt.compareSync(password, foundUser.password)) {
                    resolve('Congrats');
                } else {
                    reject('Invalid username / password.');
                }
            } catch(error) {
                reject('Please try again later.');
            }
        });
    }

}

module.exports = User;
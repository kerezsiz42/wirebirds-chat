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

    async validate() {
        const {username, email, password} = this.data;
        return new Promise(async (resolve, reject) => {
            if(!validator.isEmail(email)) {this.errors.push('You must provide a valid email.')}
            if(username != "" && !validator.isAlphanumeric(username)) {this.errors.push('Username can only contain letters and numbers.')}
            if(password.length < 8) {this.errors.push('Password should be at least 8 characters long.')}
            if(password.length > 50) {this.errors.push('Password cannot exceed 50 characters.')}
            if(password.length < 3) {this.errors.push('Username should be at least 3 characters long.')}
            if(password.length > 30) {this.errors.push('Username cannot exceed 30 characters.')}
            
            if(username.length >= 3 && username.length < 31 && validator.isAlphanumeric(username)) {
                const usernameExists = await usersCollection.findOne({username})
                if(usernameExists) {this.errors.push('This username is already taken.')}
            }
            if(validator.isEmail(email)) {
                const emailExists = await usersCollection.findOne({email})
                if(emailExists) {this.errors.push('This email address is already being used.')}
            }
            resolve();
        });
    }

    register() {
        const {username, email, password} = this.data;
        return new Promise(async (resolve, reject) => {
            this.cleanUp();
            await this.validate();

            if(!this.errors.length) {
                this.data.password = bcrypt.hashSync(password, 10);
                await usersCollection.insertOne(this.data);
                resolve();
            } else {
                reject(this.errors);
            }
        });
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
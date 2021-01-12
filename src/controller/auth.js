const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
    User.findOne({ email: req.body.email })
    .exec((err, user) => {
        if(user && !err) {
            return res.status(400).json({
                message: 'Admin already registered'
            });
        }

        const {
            firstName,
            lastName,
            email,
            password,
        } = req.body;

        User.find({})
        .exec((error, users) => {
            if(error) {
                return res.status(400).json({
                    message: 'Something went wrong',
                    error
                }) 
            } else {
                const _user = new User({ 
                    firstName, 
                    lastName, 
                    email, 
                    password,
                    role: 'admin',
                    employee_id: users.length + 1
                });
        
                _user.save((error, data) => {
                    if(!error && data) {
                        return res.status(201).json({
                            message: 'User Created Successfully'
                        })
                    } else {
                        return res.status(400).json({
                            message: 'Something went wrong',
                            error
                        })
                    }
                })
            }
        })
    })
}

exports.signin = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email: email })
    .exec((error, user) => {
        if(error) {
            res.status(400).json({
                message: error
            })
        } 
        if(user) {
            if(user.authenticate(password) && user.role === 'admin') {
                const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
                const { _id, firstName, lastName, email, role, fullName } = user;
                res.status(200).json({
                    token,
                    user: { _id, firstName, lastName, email, role, fullName },
                    message: 'LoggedIn Successfully'
                })
            } else {
                res.status(400).json({
                    message: 'Invalid Password'
                })
            }
        } else {
            res.status(400).json({
                message: 'User does not exist'
            })
        }
    })
}
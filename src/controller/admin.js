const User = require('../models/user');
const Company = require('../models/company');

exports.createUser = (req, res) => {
    User.findOne({ email: req.body.email })
    .exec((err, user) => {
        if(user && !err) {
            return res.status(400).json({
                message: 'User already created'
            });
        }
        const {
            name,
            email,
            password,
            phone,
            company_id,
            reporting_to
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
                    name,
                    email, 
                    password,
                    role: 'user',
                    employee_id: users.length + 1,
                    phone,
                    company_id,
                    reporting_to
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

exports.updateUser = (req, res) => {
    User.findById(req.params.id)
    .exec((error, user) => {
        if(error) {
            res.status(400).json({
                error
            });
        }
        if(user) {
            User.findByIdAndUpdate(req.params.id, {
                "$set": { ...req.body }
            })
            .exec((error, _user) => {
                if(error) return res.status(400).json({ error });
                if(_user) return res.status(201).json({ message: 'User Updated Successfully' });
            })
        } else {
            res.status(400).json({
                message: 'User Not exist'
            });
        }
    })
}

exports.createCompany = (req, res) => {
    Company.findOne({ code: req.body.code })
    .exec((err, company) => {
        if(err) {
            return res.status(400).json({
                err
            })
        }
        if(company) {
            return res.status(400).json({
                message: 'Company already created'
            });
        } else {
            const { name, headquarter, size, type, founded } = req.body;
            const code = `${name.slice(0,4)}${founded}`
            const _company = new Company({ 
                name, 
                headquarter, 
                size, 
                type, 
                founded,
                code
            });
    
            _company.save((error, data) => {
                if(error) {
                    return res.status(201).json({
                        error
                    })
                } else {
                    return res.status(201).json({
                        message: 'Company Created Successfully'
                    }) 
                }
            })
        }
    })
}

exports.updateCompany = (req, res) => {
    Company.findById(req.params.id)
    .exec((error, company) => {
        if(error) {
            res.status(400).json({
                error
            });
        }
        if(company) {
            Company.findByIdAndUpdate(req.params.id, {
                "$set": { ...req.body }
            })
            .exec((error, _company) => {
                if(error) return res.status(400).json({ error });
                if(_company) return res.status(201).json({ message: 'Company Updates Successfully' });
            })
        } else {
            return res.status(400).json({
                message: 'Company Not exist'
            });
        }
    })
}

exports.getSubordinates = (req, res) => {
    User.findById(req.params.userId)
    .exec((error, user) => {
        if(error) return res.status(400).json({ error });
        if(user) {
            const subordinatePromise = User.find({ reporting_to: user._id });
            const reportingPromise = User.find({ _id: user.reporting_to });
            Promise.all([subordinatePromise, reportingPromise])
            .then(([subordinates, reportingTo]) => {
                return res.status(200).json({ subordinates, reportingTo });
            }).catch((err) => {
                return res.status(400).json({ message: err });
            })
        } else return res.status(400).json({ message: 'User does not exist' });
    })
}

exports.searchEmployee = (req, res) => {
    const { type, value } = req.query;
    if(type === 'name') {
        User.find({ name: { $regex: value, $options: '$m' } })
        .exec((error, user) => {
            if(error) return res.status(400).json({ error });
            if(user) return res.status(200).json({ user });
        })
    } else {
        User.find({ $or: [{phone: value}, {employee_id: value}] })
        .exec((error, user) => {
            if(error) return res.status(400).json({ error });
            if(user) return res.status(200).json({ user });
        })
    }
}
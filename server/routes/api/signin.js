const User = require('../../models/User')

module.exports = (app) => {

    app.post('/api/account/signup', (req, res, next) => {
        const{body} = req;

        const {password} = body;
        let{email}=body;

        if (!(email&&password)) {
            return res.send({
                success: false,
                message: 'Email/password cannot be blank'
            })
        }

        email = email.toLowerCase().trim();
        
        User.find({
            email: email
        }, (err, previousUsers) => {
            if (err) {
                return res.send ({
                    success: false,
                    message: 'Error: Server error'
                })
            } else if (previousUsers.length > 0) {
                return res.send ({
                    success: false,
                    message: 'Error: Account already exist'
                })
            }

            const newUser = new User()

            newUser.email = email;
            newUser.password = newUser.generateHash(password)

            newUser.save((err, user) => {
                if (err) {
                    return res.send ({
                        success: false,
                        message: 'Error: server error'
                    })
                }
                return res.send({
                    success: true,
                    message: 'Signed up'
                })
            })
        })
    })
}
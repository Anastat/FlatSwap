const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/User')


loginRouter.post('/', async (request, response) => {
    try { 
        const body = request.body

    const user = await User.findOne({email: body.email})
    const passwordCorrect = user === null ? false :
        await bcrypt.compare(body.password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return response.status(401).send({error: 'invalid usename or password'})
    }

    const userForToken = {
        name: user.firstName,
        id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    response.status(200).send({token, user})
    } catch (exeption) {
        console.log(exeption)
        response.status(500).json({error: 'somthing went wrong'})
    }
})


module.exports = loginRouter
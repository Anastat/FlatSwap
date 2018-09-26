const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users.map(User.format))
})

usersRouter.post('/', async (request, response) => {
    const body = request.body
    try {
        const existingUser = await User.find({email: body.email})
        if (existingUser.length > 0) {
            return response.status(400).json({error: 'email must be unique'})
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User ({
            email: body.email,
            firstName: body.firstName,
            lastName: body.lastName,
            passwordHash
        })

        const savedUser = await user.save()

        response.json(User.format(savedUser))
    } catch (exception) {
        console.log(exeption)
        response.status(500).json({error: 'something went wrong'})
    }
    
})

module.exports = usersRouter
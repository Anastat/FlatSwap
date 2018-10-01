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
            return response.status(400).json({error: 'User with this email already exist'})
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User ({
            email: body.email,
            firstName: body.firstName,
            lastName: body.lastName,
            profilePicture: Buffer('body.profilePicture'),
            passwordHash
        })

        const savedUser = await user.save()

        response.json(User.format(savedUser))
    } catch (exception) {
        console.log(exeption)
        response.status(500).json({error: 'something went wrong'})
    }
    
})

usersRouter.put('/:id', (response, request) => {
    const body = response.body

    const user = {
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        country: body.country,
        about: body.about,
        school: body.school,
        profilePicture: Buffer('body.profilePicture')
    }
    User
        .findByIdAndUpdate(request.params.id, user, {new: true})
        .then(updatedUser => {
            response.json(User.format(updatedUser))
        }) 
        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'id wrong' })
        })
} )

module.exports = usersRouter
const http = require('http')
const bodyParser = require ('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const express = require('express')
const path = require('path')
const app = express()
const middleware = require('./server/utils/middleware')
const userRouter = require('./server/controllers/users')
const loginRouter = require('./server/controllers/login')
const hostsRouter = require('./server/controllers/hostRouter')

const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/api', { target: 'http://localhost:5000/' }));
};

if ( process.env.NODE_ENV !== 'production' ) {
  require('dotenv').config()
} else {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
  });
}

const port = process.env.PORT || 5000;
const mongoUrl = process.env.MONGODB_URI



mongoose.connect(mongoUrl, { useNewUrlParser: true })
mongoose.Promise = global.Promise

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(middleware.logger)


app.use('/api/users', userRouter) //POST - save new user in data base GET - return list of users
app.use('/api/login', loginRouter)
app.use('/api/hosts', hostsRouter)

app.use(middleware.error)

const server = http.createServer(app)

server.listen(port, () => console.log(`Listening on port ${port}`));

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}




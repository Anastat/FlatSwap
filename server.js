const http = require('http')
const bodyParser = require ('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const express = require('express');
const path = require('path');
const app = express();
const userRouter = require('./server/controllers/users')
const loginRouter = require('./server/controllers/login')

if ( process.env.NODE_ENV !== 'production' ) {
  require('dotenv').config()
}

const port = process.env.PORT || 5000;
const url = process.env.MONGODB_URI
// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});



if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

mongoose
    .connect(url, { useNewUrlParser: true })
    .then(() => {
        console.log('connected to database', url)
    })
    .catch(err => {
        console.log(err)
    })

app.use(cors())
app.use(bodyParser.json())
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

const server = http.createServer(app)

app.listen(port, () => console.log(`Listening on port ${port}`));

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}




// https://www.w3ctech.com/topic/2032
// http://www.hackdig.com/03/hack-68770.htm

const spdy = require('spdy')
const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()

app.use(express.static('public'));

app.get('*', (req, res) => {
  res
    .status(200)
    .json({message: 'ok'})
})

const HttpsPort = 3000
const HttpPort = 4000


const options = {
  key: fs.readFileSync(__dirname + '/cert/server.key'),
  cert:  fs.readFileSync(__dirname + '/cert/server.crt')
}

spdy
  .createServer(options, app)
  .listen(HttpsPort, (error) => {
    if (error) {
      console.error(error)
      return process.exit(1)
    } else {
      console.log('Listening on port: ' + HttpsPort + '.')
    }
  })

  app.listen(HttpPort, () => {
    console.log(`Example app listening at http://localhost:${HttpPort}`)
  })
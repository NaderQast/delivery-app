const jwt = require('jsonwebtoken')
require('dotenv').config()

const accessKey = {
    developer_id: process.env.developer_id,
    key_id: process.env.key_id,
    signing_secret:process.env.signing_secret ,
  }

const data = {
  aud: 'doordash',
  iss: accessKey.developer_id,
  kid: accessKey.key_id,
  exp: Math.floor(Date.now() / 1000 + 300),
  iat: Math.floor(Date.now() / 1000),
}

const headers = { algorithm: 'HS256', header: { 'dd-ver': 'DD-JWT-V1' } }

const token = jwt.sign(
  data,
  Buffer.from(accessKey.signing_secret, 'base64'),
  headers,
)

console.log(token)
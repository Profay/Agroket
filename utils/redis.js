require('dotenv').config();
const redis = require('redis')
const client = redis.createClient({
  password: process.env.REDIS_PW,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT || 14071,
  }
});

  const cacheToken = async (token) => {
    client.on('error', err => {
      console.log('Redis client error.', err);
    })
    await client.connect();
    console.log('Connected to Redis');
    await client.set('my_token', token, (err) => {
      if (err) {
        console.error('Error caching token:', err);
      } else {
        console.log('Token cached successfully.');
      }
    });
    await client.disconnect()
  }

  const getToken = async () => {
    client.on('error', err => {
      console.log('Redis client error.', err);
    })
    await client.connect();
    console.log('Connected to Redis');
    return new Promise((resolve, reject) => {
      client.get('my_token', (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      });
    })
    await client.disconnect()
  }

module.exports = {getToken, cacheToken}

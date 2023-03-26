require('dotenv').config();
const redis = require('redis')
const client = redis.createClient({
  password: process.env.REDIS_PW,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT || 14071,
  }
});
(async () => {
  await client.connect();
  client.on('error', err => console.log('Redis Client Error', err));
  client.on('ready', () => console.log('Redis Client Connected'));
})();

class redistoken {
  static async cacheToken(token) {
    client.set('my_token', token, (err) => {
      if (err) {
        console.error('Error caching token:', err);
      } else {
        console.log('Token cached successfully.');
      }
    });
  }

  static async getToken() {
    return new Promise((resolve, reject) => {
      client.get('my_token', (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      });
    });
  }
}

module.exports = redistoken;

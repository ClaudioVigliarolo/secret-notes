

module.exports = {

  MONGO_URL: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/new-secret-notes',
  HOSTNAME: process.env.NODE_ENV ? 'https://secretnotes.herokuapp.com/' : 5000,

  JWT_CODE: process.env.JWT_CODE || 'kebbaro4ever'



}























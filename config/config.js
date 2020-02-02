


module.exports = {

  MONGO_URL: process.env.NODE_ENV === 'production' ? process.env.MONGO_URL : 'mongodb+srv://claudio:gennaio@cluster0-ftv1t.mongodb.net/test',
  PORT: process.env.PORT ? process.env.PORT : 5000,
  JWT_CODE: process.env.JWT_CODE || 'kebbaro4ever'



}




























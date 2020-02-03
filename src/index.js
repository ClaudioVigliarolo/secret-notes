const { PORT } = require('../config/config');
const express = require('express');
require('./db/mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const userRouter = require('./routers/user');
const NotebookRouter = require('./routers/noteBook');
const cors = require('cors');
const history = require('express-history-api-fallback');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
const app = express();

// Exprees will serve up production assets
app.use(express.json());
app.use(compression());
app.use(cors());
app.use(
  fileUpload({
    createParentPath: true,
    limits: { fileSize: 50 * 1024 * 1024 }
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(userRouter);
app.use(NotebookRouter);
app.use(morgan('dev'));
app.use(history());
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
app.use(express.static(__dirname + '/public'));


app.listen(PORT, () => {
  console.log('Server is up on PORT ' + PORT);
});

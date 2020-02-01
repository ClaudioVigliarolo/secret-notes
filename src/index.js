const express = require('express');
require('./db/mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const userRouter = require('./routers/user');
const NotebookRouter = require('./routers/noteBook');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 5000;
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '../frontend'));
app.use(express.json());
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
app.use(morgan('dev'));
app.use(NotebookRouter);

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});

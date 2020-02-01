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

if (process.env.NODE_ENV === 'production') {
    // Exprees will serve up production assets
    app.use(express.static('../frontend/build'));

    // Express serve up index.html file if it doesn't recognize route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'static', 'index.html'));
    });
}

app.use(express.static(__dirname + '/public'));
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

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const multer = require('multer');
const upload = multer({dest:'uploads/'});

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single("upfile"),
    (req, res) => {
        const upfile = req.file;
        if(typeof upfile === 'undefined') {
            res.json({error: 'file not uploaded'});
        }
        else {
            res.json({
                name: upfile.originalname,
                type: upfile.mimetype,
                size: upfile.size
            });
        }
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

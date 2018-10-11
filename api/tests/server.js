require('./../config/bootstrap');

const express           = require('express');
const bodyParser        = require('body-parser');
const cookieParser      = require('cookie-parser');

const routers           = require('./../build/controllers').default;
const authorize         = require('./../build/utils/api/auth').authorize;


let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(/^((?!\/api\/login\/)).*$/, authorize);

app.use('/api', routers);

app.listen(4000);


module.exports = app;
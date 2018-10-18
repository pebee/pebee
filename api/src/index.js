import './../config/bootstrap';
import express from 'express';

// Parsers
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';


import routers from './controllers';
import { authorize } from './utils/api/auth';
import GCS from './utils/storage';

new GCS().getObjects('Media').then(res => {
    console.log(res);
});

const app = express();

app.listen(process.env.API_PORT, () => {
    console.log('PeBeeCMS API listening on port ' + process.env.API_PORT);
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    next();
});

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


if (process.env.USE_AUTH === '1') {
    app.use(/^((?!\/api\/login)).*$/, authorize);
}

app.use('/api', routers);
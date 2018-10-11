'use strict';

process.env.NODE_ENV = 'test';


const app = require('./server');
const config = require('./config')(app);
const sync = require('./models/sync');


describe('Tests bootstrap', () => {

    before(done => {
        sync().then(() => {
            done();
        }).catch(e => {
            done(e);
        });
    });

    require('./models/accountCategories')(config);
    require('./models/users')(config);

});
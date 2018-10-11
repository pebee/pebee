'use strict';


let config = require('./../config');



describe('API', () => {

    describe('Authentication', () => {

        it('should login user and set token', done => {

            config.agent
                .post('/api/login/')
                .send({ username: 'user #1', password: 'password' })
                .end((err, res) => {

                    config.expect(res).to.have.cookie('authorizationToken');

                });

        });

    });

});
'use strict';


module.exports = config => {

    const agent = config.agent;
    const expect = config.expect;

    describe('Option', () => {

        describe('/api/options', () => {

            it('POST /api/login - should login the user', done => {
    
                agent
                    .post('/api/login/')
                    .send({ username: 'user #1', password: 'password' })
                    .end((err, res) => {
    
                        expect(res).to.have.cookie('authorizationToken');

                        done();
    
                    });
    
            });

            it('GET /all - should return all options', done => {

                agent
                    .get('/api/options/all')
                    .end((err, res) => {

                        expect(res.body.data).to.be.an('array');

                        done();

                    });

            });

            it('GET /:key - should return single option by key', done => {

                agent
                    .get('/api/options/lang')
                    .end((err, res) => {

                        expect(res.body.data).to.be.an('object');
                        expect(res.body.data.key).to.equal('lang');

                        done();

                    });

            });

            it('GET /language - should return current language', done => {

                agent
                    .get('/api/options/language')
                    .end((err, res) => {

                        expect(res.body.data).to.be.an('object');
                        expect(res.body.data).to.have.all.keys('language', 'code');

                        done();

                    });

            });

            it('POST / - should create new option', done => {

                let data = {
                    key: 'api_url',
                    displayName: 'API url',
                    value: 'http://localhost:3000/'
                };

                agent
                    .post('/api/options')
                    .send(data)
                    .end((err, res) => {

                        expect(res.body.data).to.be.an('object');
                        expect(res.body.data).to.own.include(data);

                        done();

                    });

            });

            it('PUT /api_url - should update previously created option', done => {

                let data = {
                    value: 'http://localhost:4000'
                };

                agent
                    .put('/api/options/api_url')
                    .send(data)
                    .end((err, res) => {

                        expect(res.body.data).to.be.an('object');
                        expect(res.body.data).to.own.include(data);

                        done();

                    });
                
            });

            it('GET /available-options - should return all available options for each setting', done => {

                agent
                    .get('/api/options/available-options')
                    .end((err, res) => {

                        expect(res.body.data).to.be.an('object');
                        expect(res.body.data).to.have.key('lang');

                        done();

                    });

            });

            it('GET /available-options?key=lang - should return available language codes', done => {

                agent
                    .get('/api/options/available-options?key=lang')
                    .end((err, res) => {

                        expect(res.body.data).to.be.an('array');

                        done();

                    });

            });

            it('DELETE /:key - should try to delete protected option', done => {

                agent
                    .delete('/api/options/lang')
                    .end((err, res) => {

                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.all.keys('statusCode', 'message');

                        done();

                    });

            });

        });

    });

};
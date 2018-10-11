'use strict';



module.exports = config => {

    describe('AccountCategory', () => {

        describe('/api/account_categories', () => {
    
            it('POST /api/login - should login the user', done => {
    
                config.agent
                    .post('/api/login/')
                    .send({ username: 'user #1', password: 'password' })
                    .end((err, res) => {
    
                        config.expect(res).to.have.cookie('authorizationToken');

                        done();
    
                    });
    
            });
    
            it('GET /all should return all account categories', done => {
    
                config.agent
                    .get('/api/account_categories/all')
                    .end((err, res) => {
    
                        config.expect(res.body.data).to.be.an('array');
                        config.expect(res.body.data.length).to.equal(2);
    
                        done();
    
                    });
    
            });
    
            it('GET /:id should return single account category', done => {
    
                config.agent
                    .get('/api/account_categories/1')
                    .end((err, res) => {
    
                        config.expect(res.body.data).to.be.an('object');
                        config.expect(res.body.data.id).to.equal(1);
                        config.expect(res.body.data.permissions).to.be.an('array');
    
                        done();
    
                    });
    
            });
    
            it('GET /?limi=2&order=asc should return 2 paginated account categories', done => {
    
                config.agent
                    .get('/api/account_categories?limit=2&order=asc')
                    .end((err, res) => {
    
                        config.expect(res.body.data).to.be.an('array');
                        config.expect(res.body.data[0].id).to.equal(1);
                        config.expect(res.body.data[1].id).to.equal(2);
                        config.expect(res.body.data.length).to.equal(2);
    
                        done();
                        
                    });
    
            });
    
            it('POST / should create new account category', done => {
    
                let data = {
                    name: 'Redaktor'
                };
    
                config.agent
                    .post('/api/account_categories')
                    .send(data)
                    .end((err, res) => {
    
                        config.expect(res.body.data.name).to.equal(data.name);
                        config.expect(res.body.data.label).to.equal('redaktor');
    
                        done();
    
                    });
    
            });
    
            it('PUT /:id - should update account category', done => {
    
                let data = {
                    name: 'Updated redaktor'
                };
    
                config.agent
                    .put('/api/account_categories/3')
                    .send(data)
                    .end((err, res) => {
    
                        config.expect(res.body.data.name).to.equal('Updated redaktor');
                        config.expect(res.body.data.label).to.equal('updated-redaktor');
    
                        done();
    
                    });
    
            });
    
            it('DELETE /:id - should delete account category', done => {
    
                config.agent
                    .delete('/api/account_categories/3')
                    .end((err, res) => {
    
                        config.expect(res.body.statusCode).to.equal(200);
    
                        done();
                        
                    });
                
            });
    
        });
    
    });

};
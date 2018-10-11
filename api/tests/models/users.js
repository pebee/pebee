'use strict';



module.exports = config => {

    describe('User', () => {

        describe('/api/users', () => {

            after(done => {
                config.agent.close();
                done();
            });

            it('POST /api/login - should login the user', done => {

                config.agent
                    .post('/api/login/')
                    .send({ username: 'user #1', password: 'password' })
                    .end((err, res) => {
    
                        config.expect(res).to.have.cookie('authorizationToken');

                        done();
    
                    });

            });
    
            it('GET /all - should return all users', (done) => {
    
                config.agent
                    .get('/api/users/all')
                    .end((err, res) => {
                        
                        config.expect(res.body.statusCode).to.equal(200);
                        config.expect(res.body.data).to.be.a('array');
                        config.expect(res.body.data.length).to.equal(3);
    
                        done();
                    });
                
            });
    
            it('GET /?limit=2 - should return 2 users - pagination', (done) => {
    
                config.agent
                    .get('/api/users?limit=2')
                    .end((err, res) => {
    
                        config.expect(res.body.statusCode).to.equal(200);
                        config.expect(res.body.data).to.be.a('array');
                        config.expect(res.body.data.length).to.equal(2);
    
                        done();
    
                    });
    
            });
    
            it('POST / - should create new user', done => {
    
                let data = {
                    username: 'user #4',
                    email: 'user4@example.com',
                    password: 'password',
                    accountCategory: 2
                };
    
                config.agent
                    .post('/api/users')
                    .send(data)
                    .end((err, res) => {
    
                        config.expect(res.body.data).to.be.an('object');
                        config.expect(res.body.data.username).to.equal(data.username);
                        config.expect(res.body.data.accountCategory).to.equal(2);
    
                        done();
    
                    });
    
            });
    
            it('PUT /:id - should update user', done => {
    
                let data = {
                    email: 'updated_user4@example.com'
                };
    
                config.agent
                    .put('/api/users/4')
                    .send(data)
                    .end((err, res) => {
    
                        config.expect(res.body.data.email).to.equal(data.email);
    
                        done();
    
                    });
    
            });
    
            it('PUT /:id - unique username error (422)', done => {
    
                let data = {
                    username: 'user #1'
                };
    
                config.agent
                    .put('/api/users/2')
                    .send(data)
                    .end((err, res) => {
                        
                        config.expect(res.body.statusCode).to.equal(422);
                        config.expect(res.body.message).to.be.a('string');
    
                        done();
                    });
    
            });

            it('PUT /:id - foreign key error (422)', done => {

                let data = {
                    accountCategory: 100
                };

                config.agent
                    .put('/api/users/2')
                    .send(data)
                    .end((err, res) => {
                        
                        config.expect(res.body.statusCode).to.equal(422);
                        config.expect(res.body.message).to.be.a('string');

                        done();
                    });

            })
    
            it('DELETE /:id - should delete user', done => {
    
                config.agent
                    .delete('/api/users/4')
                    .end((err, res) => {
    
                        config.expect(res.body.statusCode).to.equal(200);
    
                        done();
    
                    });
    
            });

            it('PUT /:id/restore - should restore user', done => {

                config.agent
                    .put('/api/users/4/restore')
                    .end((err, res) => {

                        config.expect(res.body.statusCode).to.equal(200);
                        config.expect(res.body.message).to.be.a('string');

                        done();

                    });

            });
    
        });
    
    });

}
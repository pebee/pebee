'use strict';

const chai      = require('chai');
const chaiHttp  = require('chai-http');
const should    = chai.should()
const expect    = chai.expect;


chai.use(chaiHttp);



module.exports = (app) => {
    return {
        agent: chai.request.agent(app),
        expect
    };
};
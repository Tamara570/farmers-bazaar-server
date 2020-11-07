const knex = require('knex');
const app = require('../src/app');
 
const { makeMaliciousVendor, makeVendors } = require('./vendor-dummy-tests');
 
describe('Vendors API:', function () {
    let db;
 
 
    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    });
 
    before('cleanup', () => db.raw('TRUNCATE TABLE vendor RESTART IDENTITY;'));
 
    afterEach('cleanup', () => db.raw('TRUNCATE TABLE vendor RESTART IDENTITY;'));
 
    after('disconnect from the database', () => db.destroy());
}

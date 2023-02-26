import supertest from "supertest";
const request = supertest("https://gorest.co.in/public-api/");
const TOKEN = "99e9d9sdsd";

import { expect } from "chai";

describe('Users', () => {
    let userId;
    //Describe block for adding user
    describe('POST', () => {
        //API test to add new user 
        it('/users', () => {
            const data = {
                email: `abzd${Math.floor(Math.random() * 9999)}@gmail.com`,
                name: 'abyd',
                gender: 'female',
                status: 'active'
            };
            return request.post('users')
                .set('Authorization', `Bearer ${TOKEN}`)
                .send(data)
                .then((res) => {
                    console.log(res.body);
                    expect(res.body.data).deep.include(data);
                    userId = res.body.data.id; // Storing the id of user in userId variable
                });
        });
    });

    //Describe block for getting user
    describe('GET', () => {
        it('/users', (done) => {
            request.get(`users?access-token=${TOKEN}`).end((err, res) => {
                expect(res.body.data).to.not.be.empty;
                done();
            });
        });
        it('/users/:id', () => {
            return request.get(`users/${userId}?access-token=${TOKEN}`).then((res) => {
                expect(res.body.data.id).to.be.equal(userId);
            });
        });
        it('/users with query params', () => {
            const url = `users?access-token=${TOKEN}&page=5&gender=female&status=active`;
            return request.get(url).then((res) => {
                expect(res.body.data).to.not.be.empty;
                res.body.data.forEach((data) => {
                    expect(data.gender).to.equal('female');
                    expect(data.status).to.equal('active');
                });
            });
        });
    });

    //Describe block for updating user
    describe('PUT', () => {
        it('/users/:id', () => {
            const data = {
                status: "active",
                name: `abzd ${Math.floor(Math.random() * 9999)}`
            };

            return request.put(`users/${userId}`)
                .set('Authorization', `Bearer ${TOKEN}`)
                .send(data)
                .then((res) => {
                    console.log(res.body);
                    expect(res.body.data).deep.include(data);
                });
        });
    });

    //Describe block for deleting user
    describe('DELETE', () => {
        it('/users/:id', () => {
            return request.delete(`users/${userId}`)
                .set('Authorization', `Bearer ${TOKEN}`)
                .then((res) => {
                    expect(res.body.data).to.be.equal(null);
                });
        });
    });
});
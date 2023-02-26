import supertest from "supertest";
const request = supertest("https://gorest.co.in/public-api/");
const TOKEN = "99e9d9sdsd";

import { expect } from "chai";

describe('Users', () => {
    it('GET/ Users', (done) => {
        request.get(`users?access-token=${TOKEN}`).end((err, res) => {
            //console.log(err);
            //console.log(res.body);
            expect(res.body.data).to.not.be.empty;
            //expect(res.body.data).to.be.empty;
            done();
        });
    });

    it('GET/User/:id', () => {
        return request.get(`users/556214?access-token=${TOKEN}`).then((res) => {
            //expect(res.body.data).to.not.be.empty;
            expect(res.body.data.id).to.be.equal(556214);
        });
    });

    it('GET/Users with query params', () => {
        const url=`users?access-token=${TOKEN}&page=5&gender=female&status=active`;
        return request.get(url).then((res) => {
            expect(res.body.data).to.not.be.empty;
            res.body.data.forEach((data) => {
                expect(data.gender).to.equal('female');
                expect(data.status).to.equal('active');
            });
        });
    });

    it('POST/Users',()=>{
        const data={
            email:`abzd${Math.floor(Math.random() *9999)}@gmail.com`,
            name:'abyd',
            gender:'female',
            status:'active'
        };
        return request.post('users')
        .set('Authorization',`Bearer ${TOKEN}`)
        .send(data)
        .then((res)=>{
            console.log(res.body);
            //expect(res.body.data.email).to.equal(data.email);
            //expect(res.body.data.status).to.equal(data.status);
            expect(res.body.data).deep.include(data);
        });
    });

    it('PUT/users/:id',()=>{
        const data={
            status:"active",
            name:`abzd ${Math.floor(Math.random() *9999)}`
        };

        return request.put('users/559021')
        .set('Authorization',`Bearer ${TOKEN}`)
        .send(data)
        .then((res)=>{
            console.log(res.body);
            expect(res.body.data).deep.include(data);
        });
    });

    it('DELETE/users/:id',()=>{
        return request.delete('users/559419')
        .set('Authorization',`Bearer ${TOKEN}`)
        .then((res)=>{
            expect(res.body.data).to.be.equal(null);
        });
    });

});
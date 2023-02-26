
import request from "../config/common";
import { expect } from "chai";
import { createRandomUser } from "../helper/user_helper";
require('dotenv').config();

//const faker=require('faker');
//const TOKEN="99e9d9sdsd";
const TOKEN=process.env.USER_TOKEN;

describe('User posts', () => {
    let postId, userId;

    before(async () => {
        //Create a new user, the api test method is written in createRandomUser() method under user_helper.js inside helper folder
        userId = await createRandomUser(); //passing the id of the user from createRandomUser() and storing it in userId variable
    });

    it('/posts', async () => {
        //Creating post data for sending in request body
        const data = {
            user_id: userId,
            title: 'New 23 Feb Post', //title: faker.lorem.sentence(),
            body: 'Hello 123'
        };
        //Create a post for the newly created user
        const postRes = await request.post('posts')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(data);
        console.log(postRes.body);
        expect(postRes.body.data).to.deep.include(data);
        postId = postRes.body.data.id;

    });

    it('/GET/post/:id', async () => {
        await request.get(`posts/${postId}`)
            .set('authorization', `Bearer ${TOKEN}`)
            .expect(200);
    });

    describe('Negative Tests', () => {
        it('401 Authentication failed', async () => {
            const data = {
                user_id: userId,
                title: 'New 23 Feb Post',
                body: 'Hello 123'
            };
            const postRes = await request.post('posts')
                .send(data);
            expect(postRes.body.code).to.equal(401);
            expect(postRes.body.data.message).to.equal("Authentication failed");
        });

        it('422 Data validation failed', async () => {
            const data = {
                user_id: userId,
                title: 'New 23 Feb Post',
            };
            const postRes = await request.post('posts')
                .set('Authorization', `Bearer ${TOKEN}`)
                .send(data);
            expect(postRes.body.code).to.equal(422);
            expect(postRes.body.data[0].field).to.equal('user');
            expect(postRes.body.data[0].message).to.equal("must exist");
        });
    });
});
import request from "../config/common";
require('dotenv').config();

const TOKEN=process.env.USER_TOKEN;
//const TOKEN="99e9d9sdsd";

export const createRandomUser = async () => {
    //Creating user data for sending in request body
    const user_data = {
        email: `abzd${Math.floor(Math.random() * 9999)}@gmail.com`,
        name: 'abyd',
        gender: 'female',
        status: 'active'
    };
    //Create a new user
    const res = await request.post('users')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(user_data);
        console.log(res.body);
    return res.body.data.id; // Returning the id of user, which can be used in any other methods which require userId.
};
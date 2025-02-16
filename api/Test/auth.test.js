const request = require('supertest')
const sequelize = require('./jest.setup')
const app = require('../app');
const { UnknownConstraintError } = require('sequelize');

describe('Auth Api Test', () => {
    beforeAll(async () => {
        await sequelize.sync({force:true});
    });

    it('Should sign up a user', async () => {
        const userData = {
            first_name:'Monia',
            last_name:'Covenant',
            email:'monia@gmail.com',
            phoneNumber:'08099104214',
            role:'User',
            password:'password123'
        }

        const response = await request(app)
        .post('/auth/sign-up')
        .set('content-type','application/json')
        .send(userData)

        console.log('Response Status:', response.status)
        console.log('Response Body:', response.body)

        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        //expect(response.body.data).toHaveProperty('token')
        expect(response.body).toHaveProperty('message');
        expect(response.body.data).toHaveProperty('user');

        const user = response.body.data.user;
        expect(user).toHaveProperty('first_name', "Monia")
        expect(user).toHaveProperty('last_name', "Covenant")
        expect(user).toHaveProperty('email','monia@gmail.com')
        expect(user).toHaveProperty('phoneNumber','08099104214')
        expect(user).toHaveProperty('role','User')
        //expect(user).toHaveProperty('password','password123')
    });

    it('It should login an existing user', async () => {
        const userData = {
            email:'monia@gmail.com',
            password:'password123'
        }
        const response = await request(app)
        .post('/auth/login')
        .send(userData)

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true)
        expect(response.body.data).toHaveProperty('token')
    })

    it('should return error for invalid credentials', async () => {
        const loginData = {
            email: 'wrongemail@example.com',
            password:'wrongpassword',
        };

        const response = await request(app)
            .post('/auth/login')
            .send(loginData)

            expect(response.status).toBe(400)
            expect(response.body.success).toBe(false)
            expect(response.body.message).toBe('Invalid Credentials')
     });

     it('should get users by ID', async () => {
        const response = await request(app)
        .get(`/auth/user/1`)
        .set('Content-Type',"application/json");

        console.log('Get user response:',response.body)
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true)
        expect(response.body.data.user).toHaveProperty('first_name','Monia')
     });

     it("Should get all users", async () => {
        const response = await request(app)
        .get('/auth/all-user')
        .set("Content-Type","application/json");

        console.log("Get all Users response:", response.body);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true)
        expect(Array.isArray(response.body.data.users)).toBe(true);
        expect(response.body.data.users.length).toBeGreaterThan(0);
     });

     it("should delete user by ID", async () => {
        const response = await request(app)
            .delete(`/auth/delete/1`)
            .set("Content-Type", "application/json");

        console.log("Delete User Response:", response.body);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe("User deleted successfully");
    });

    it("should return 404 when getting deleted user", async () => {
        const response = await request(app)
            .get(`/auth/delete/1`) // Try to fetch deleted user
            .set("Content-Type", "application/json");

        console.log("Get Deleted User Response:", response.body);

        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("User not found");
    });

    afterAll(async () => {
        await sequelize.close();
    })
})
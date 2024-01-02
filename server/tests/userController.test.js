require("dotenv").config();

const request = require("supertest");
const app = require("../server");
const jwt = require('jsonwebtoken');
const User = require('../models/user');

describe("create new user", () => {
    it("should create a new user and then delete it", async () => {
        const newUser = {
            name: "John",
            surname: "Doe",
            email: "john.exa@example.com",
            password: "Haslo123",
            phoneNumber: "123456789",
        };

        const registrationResponse = await request(app)
            .post("/registerForm")
            .send(newUser)
            .expect("Content-Type", /json/)
            .expect(200);

        expect(registrationResponse.body.message).toBe("User registered.");

        const token = jwt.sign({ email: 'john.exa@example.com' }, 'Haslo123');

        const deletionResponse = await request(app)
            .delete('/user:john.exa@example.com')
            .set('x-access-token', token)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(deletionResponse.body.message).toBe('User deleted successfully.');
    });

    it("should return 400 with an appropriate error message for invalid data", async () => {
        const invalidUser = {
            name: "123",
            surname: "Doe",
            email: "invalid_email",
            password: "weak",
            phoneNumber: "invalid_phone",
        };

        return request(app)
            .post("/registerForm")
            .send(invalidUser)
            .expect("Content-Type", /json/)
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain("Invalid");
            });
    });
});

describe('get user by email', () => {
    it('should return user information with a valid token', async () => {
        const testUser = {
            name: "John",
            surname: "Doe",
            email: "john.exa@example.com",
            password: "Haslo123",
            phoneNumber: "123456789",
        };

        const user = new User(testUser);
        await user.save();

        const token = jwt.sign({ email: testUser.email }, testUser.password);

        return request(app)
            .get(`/user:${encodeURIComponent(testUser.email)}`)
            .set('x-access-token', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.body.email).toBe(testUser.email);
            });
    });

    it('should return 404 with an invalid email', async () => {
        const token = jwt.sign({ email: 'test@example.com' }, 'Haslo123');

        return request(app)
            .get('/user:invalid_email')
            .set('x-access-token', token)
            .expect('Content-Type', /json/)
            .expect(404)
            .then((res) => {
                expect(res.body.message).toBe('There is no user with given email address.');
            });
    });

    it('should return 401 without a token', async () => {
        return request(app)
            .get('/user:test@example.com')
            .expect('Content-Type', "application/json; charset=utf-8")
            .expect(403)
            .then((res) => {
                expect(res.body.message).toBe('No token provided!');
            });
    });
});
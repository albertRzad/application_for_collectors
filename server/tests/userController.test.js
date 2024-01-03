require("dotenv").config();

const request = require("supertest");
const app = require("../server");
const jwt = require('jsonwebtoken');
const User = require('../models/user');

describe("create new user", () => {
    it("should create a new user", async () => {
        await User.findOneAndDelete({ email: "john.example@example.com" });

        const newUser = {
            name: "John",
            surname: "Doe",
            email: "john.example@example.com",
            password: "Haslo123",
            phoneNumber: "123456789",
        };

        const registrationResponse = await request(app)
            .post("/registerForm")
            .send(newUser)
            .expect("Content-Type", /json/)
            .expect(200);

        expect(registrationResponse.body.message).toBe("User registered.");
    }, );

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

describe('findAllUsers', () => {
    it('should return all users in the database', async () => {
        const token = jwt.sign({ email: 'admin@example.com' }, 'Haslo123');

        return request(app)
            .get('/allUsers')
            .set('x-access-token', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.body.length).toBeGreaterThan(1);
            });
    },25000);

    it('should return 403 without a token', async () => {
        return request(app)
            .get('/allUsers')
            .expect('Content-Type', "application/json; charset=utf-8")
            .expect(403)
            .then((res) => {
                expect(res.body.message).toBe('No token provided!');
            });
    });
});

describe('updateUserDetails', () => {
    it('should update user profile details successfully', async () => {
        const testUser = {
            name: "John",
            surname: "Doe",
            email: "john.old@example.com",
            password: "Haslo123",
            phoneNumber: "123456789",
        };

        const updatedUserProfileDetails = {
            newName: "Updatedjohn",
            newSurname: "Updateddoe",
            country: "Newcountry",
            bio: "Updatedbio",
            profileImage: "updated_image_url.jpg",
            userEmail: testUser.email,
        };

        const user = new User(testUser);
        await user.save();

        const token = jwt.sign({ email: testUser.email }, testUser.password);

        return request(app)
            .put('/user/profile/update')
            .set('x-access-token', token)
            .send(updatedUserProfileDetails)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe('User details updated successfully.');

                User.findOne({ email: testUser.email }).then((updatedUser) => {
                    expect(updatedUser.name).toBe(updatedUserProfileDetails.newName);
                    expect(updatedUser.surname).toBe(updatedUserProfileDetails.newSurname);
                    expect(updatedUser.country).toBe(updatedUserProfileDetails.country);
                    expect(updatedUser.bio).toBe(updatedUserProfileDetails.bio);
                    expect(updatedUser.profileImage).toBe(updatedUserProfileDetails.profileImage);
                });
            });
    });


    it('should return 400 for mismatched passwords', async () => {
        const testUser = {
            name: "John",
            surname: "Doe",
            email: "john.exa@example.com",
            password: "Haslo123",
            phoneNumber: "123456789",
        };

        const updatedUserDetails = {
            newPassword: "NewPassword123",
            confirmPassword: "MismatchedPassword"
        };

        const user = new User(testUser);
        await user.save();

        const token = jwt.sign({ email: testUser.email }, testUser.password);

        return request(app)
            .put('/user/update')
            .set('x-access-token', token)
            .send(updatedUserDetails)
            .expect('Content-Type', "application/json; charset=utf-8")
            .expect(400)
            .then((res) => {
                expect(res.body.message).toBe('Passwords aren\'t the same.');
            });
    });
});
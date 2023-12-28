require("dotenv").config();

const request = require("supertest")
const app = require("../server")

describe("POST /registerForm", () => {
    it("should create a new user", async () => {
        const newUser = {
            name: "John",
            surname: "Doe",
            email: "john.exa@example.com",
            password: "Password123",
            phoneNumber: "123456789",
        };

        return request(app)
            .post("/registerForm")
            .send(newUser)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((res) => {
                expect(res.body.message).toBe("User registered.");
            });
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

    it("should return 400 with 'Email already taken.' for an existing email", async () => {
        const existingUser = {
            name: "Jane",
            surname: "Doe",
            email: "jane.doe@example.com",
            password: "Password123",
            phoneNumber: "987654321",
        };

        request(app)
            .post("/registerForm")
            .send(existingUser)
            .expect("Content-Type", /json/)
            .expect(200);

        return request(app)
            .post("/registerForm")
            .send(existingUser)
            .expect("Content-Type", /json/)
            .expect(400)
            .then((res) => {
                expect(res.body.message).toBe("Email already taken.");
            });
    });
});
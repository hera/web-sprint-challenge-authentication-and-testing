const request = require("supertest");
const db = require("../../data/dbConfig");
const server = require("../../server");



describe("Test login", () => {
    beforeAll(async () => {
        await db("user").truncate();
    });
    

    afterAll(async () => {
        await db("user").truncate();
    });


    test("Create a user successfully", async () => {
        const response = await request(server)
            .post("/api/auth/register")
            .send({
                username: "Jamie",
                password: "1234"
            });

        expect(response.status).toBe(201);
        expect(response.headers["content-type"]).toMatch(/application\/json/);
        expect(response.body).toHaveLength(1);
        expect(response.body[0]["id"]).toBeTruthy();
    });

    test("Try to create a user with same username and password", async () => {
        const response = await request(server)
            .post("/api/auth/register")
            .send({
                username: "Jamie",
                password: "1234"
            });

        expect(response.status).toBe(400);
        expect(response.headers["content-type"]).toMatch(/application\/json/);
        expect(response.body.error).toBeTruthy();
    });

    test("Try to create a user with invalid username and password", async () => {
        const response = await request(server)
            .post("/api/auth/register")
            .send({
                username: "",
                password: ""
            });

        expect(response.status).toBe(400);
        expect(response.headers["content-type"]).toMatch(/application\/json/);
        expect(response.body.error).toBeTruthy();
    });

    

});

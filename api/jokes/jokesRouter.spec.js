const request = require("supertest");

const server = require("../../server");
const db = require("../../data/dbConfig");
const jokeDb = require("./jokeModel");


describe("Getting all jokes", () => {
    beforeAll(async () => {
        await db("user").truncate();

        // Create 1 user
        await request(server)
            .post("/api/auth/register")
            .send({
                username: "Mark",
                password: "1234"
            });
    });
    

    afterAll(async () => {
        await db("user").truncate();
    });


    test("DB contains jokes", async () => {
        const jokeList = await jokeDb.getAll();

        expect(jokeList).not.toEqual([]);
    });


    test("Shows jokes when valid token is provided", async () => {

        const loginResponse = await request(server)
            .post("/api/auth/login")
            .send({
                username: "Mark",
                password: "1234"
            });

        const jokesResponse = await request(server)
            .get("/api/jokes")
            .set("Authorization", loginResponse.body.token);

        expect(jokesResponse.status).toBe(200);
        expect(jokesResponse.headers["content-type"]).toMatch(/application\/json/);
        expect(jokesResponse.body).not.toEqual([]);
    });


    test("Doesn't show jokes when token is absent", async () => {

        const jokesResponse = await request(server).get("/api/jokes"); // No Authorization header

        expect(jokesResponse.status).toBe(401); // unauthorized
        expect(jokesResponse.headers["content-type"]).toMatch(/application\/json/);
        expect(jokesResponse.body.error).toBeTruthy();
    });


    test("Doesn't show jokes when token is invalid", async () => {

        const jokesResponse = await request(server)
            .get("/api/jokes")
            .set("Authorization", "$2a$08$XUxRzvZ1bsf1s3zym.Q2JuchRrNPGnBumB"); // invalid token

        expect(jokesResponse.status).toBe(403); // forbidden
        expect(jokesResponse.headers["content-type"]).toMatch(/application\/json/);
        expect(jokesResponse.body.error).toBeTruthy();
    });
});
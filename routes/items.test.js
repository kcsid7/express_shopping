const request = require("supertest");

const app = require("../index.js");

const items = require("../fakeDb.js");
const { default: test } = require("node:test");

const testItems = [
    {   name: "Apples", price: 200  },
    {   name: "Bananas", price: 100  }
]

beforeEach( async function() {
    items.push(testItems);
})

afterEach( async function() {
    items = [];
})


describe("GET: /items", async function() {
    test("Sends a get request to get a list of all the items", async function() {
        const resp = await request(app).get("/items");
        expect(resp.statusCode).toBe(200);
        expect(resp.body.items).toHaveLength(2);
        expect(resp.body.items).toEqual(testItems);
    })
})

describe("GET: /items/:name", async function() {
    test("Gets one item based on the name provided", async function() {
        const resp = await request(app).get(`/items/${testItems[0].name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body.item).toEqual(testItems[0])
    })

    test("Cannot find item 404 response", async function() {
        const resp = await request(app).get(`/items/peanutbutter`);
        expect(resp.statusCode).toBe(404);
    })
})

describe("PATCH: /items/:name", async function() {
    test("Updates one item based on the name provided", async function() {
        const resp = await request(app).patch(`/items/${testItems[0].name}`).send({name: "Pears", price: 150});
        expect(resp.statusCode).toBe(200);
        expect(resp.body.item).toEqual({name: "Pears", price: 150})
    })

    test("Cannot find item 404 response", async function() {
        const resp = await request(app).patch(`/items/peanutbutter`).send({name: "Pears", price: 150});
        expect(resp.statusCode).toBe(404);
    })
})


describe("POST: /items", async function() {
    test("Adds an item to the global item list", async function() {
        const resp = await request(app).post(`/items`).send({name: "Pears", price: 150});
        expect(resp.statusCode).toBe(200);
        expect(resp.body.item).toEqual({name: "Pears", price: 150})
    })
})


describe("DELETE: /items/:name", async function() {
    test("Deletes one item based on the name provided", async function() {
        const resp = await request(app).delete(`/items/${testItems[0].name}`);
        expect(resp.statusCode).toBe(200);
    })

    test("Cannot find item 404 response", async function() {
        const resp = await request(app).patch(`/items/peanutbutter`);
        expect(resp.statusCode).toBe(404);
    })
})
"use strict";

const app = require("./index.js");
const nock = require("nock");
const mockResponse = require("../events/data.json");

describe("fetch-github", function() {
  it("verifies successful response", async () => {
    nock("https://api.github.com")
      .post("/graphql")
      .reply(200, mockResponse);
    const result = await app.handler();

    expect(typeof result).toBe("object");
    expect(result.statusCode).toBe(200);
    expect(typeof result.body).toBe("string");

    const response = JSON.parse(result.body);
    expect(typeof response).toBe("object");
  });
});

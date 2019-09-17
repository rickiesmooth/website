"use strict";

const { githubService } = require("./index.js");
const nock = require("nock");
const mockResponse = require("../../events/data.json");

describe("@fetch-github/service", function() {
  nock("https://api.github.com")
    .post("/graphql")
    .reply(200, mockResponse);

  it("stringifies normalized object", async () => {
    const { data } = await githubService.retrieve();
    expect(typeof data).toBe("string");
    expect(typeof JSON.parse(data)).toBe("object");
  });
});

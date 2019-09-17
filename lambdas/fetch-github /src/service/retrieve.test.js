"use strict";

const { fetchGithubData } = require("./retrieve.js");
const nock = require("nock");
const mockResponse = require("../../events/data.json");

describe("@fetch-github/service/retrieve", function() {
  it("parses json", async () => {
    nock("https://api.github.com")
      .post("/graphql")
      .reply(200, mockResponse);
    const { data } = await fetchGithubData();
    expect(data.viewer).toBeDefined();
  });
  it("converts errors correctly", async () => {
    nock("https://api.github.com")
      .post("/graphql")
      .reply(500, "error");
    const { errors } = await fetchGithubData();
    expect(errors).toBe("Unexpected token e in JSON at position 0");
  });
});

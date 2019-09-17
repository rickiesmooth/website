"use strict";

const httpsRequest = require("./index.js");
const nock = require("nock");

const options = {
  hostname: "example.com",
  path: "/",
  method: "POST"
};

describe("common/https-request", function() {
  it("handles successful response", async () => {
    nock("https://example.com")
      .post("/")
      .reply(200, "test response");
    const res = await httpsRequest(options);
    expect(res).toBe("test response");
  });

  it("handles error response", async () => {
    nock("https://example.com")
      .post("/")
      .replyWithError({ code: "ETIMEDOUT", message: "oops" });
    await httpsRequest(options).catch(e => {
      expect(e).toStrictEqual({ code: "ETIMEDOUT", message: "oops" });
    });
  });
});

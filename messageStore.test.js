const { expect } = require("chai");
const { validateMessage } = require("../src/messageStore");

describe("validateMessage", () => {
  it("accepts a valid message", () => {
    const result = validateMessage({ username: "Alice", text: "Hello!" });
    expect(result.username).to.equal("Alice");
    expect(result.text).to.equal("Hello!");
    expect(result.createdAt).to.be.instanceOf(Date);
  });

  it("trims username and text", () => {
    const result = validateMessage({ username: " Alice ", text: " Hello " });
    expect(result.username).to.equal("Alice");
    expect(result.text).to.equal("Hello");
  });

  it("rejects an empty username", () => {
    expect(() => validateMessage({ username: "", text: "Hello" }))
      .to.throw("Username is required");
  });

  it("rejects an empty message", () => {
    expect(() => validateMessage({ username: "Alice", text: "" }))
      .to.throw("Message text is required");
  });

  it("rejects messages longer than 500 characters", () => {
    expect(() => validateMessage({ username: "Alice", text: "x".repeat(501) }))
      .to.throw("Message is too long");
  });
});

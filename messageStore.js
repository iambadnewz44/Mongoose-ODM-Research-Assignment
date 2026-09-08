function validateMessage({ username, text }) {
  if (typeof username !== "string" || username.trim().length < 1) {
    throw new Error("Username is required");
  }
  if (typeof text !== "string" || text.trim().length < 1) {
    throw new Error("Message text is required");
  }
  if (text.length > 500) {
    throw new Error("Message is too long");
  }

  return {
    username: username.trim(),
    text: text.trim(),
    createdAt: new Date()
  };
}

module.exports = { validateMessage };

const tokenBlacklist = new Set();

const add = (token) => tokenBlacklist.add(token);

const has = (token) => tokenBlacklist.has(token);

module.exports = {
  add,
  has,
};

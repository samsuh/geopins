const user = {
  _id: "1",
  name: "Sam",
  email: "test@test.com",
  picture: "http://google.com",
};
module.exports = {
  Query: {
    me: () => user,
  },
};

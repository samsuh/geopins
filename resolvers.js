const { AuthenticationError } = require("apollo-server");
const Pin = require("./models/Pin");

//dummy user object for dev/testing
// const user = {
//   _id: "1",
//   name: "Sam",
//   email: "test@test.com",
//   picture: "http://google.com",
// };

const authenticated = (next) => (root, args, ctx, info) => {
  if (!ctx.currentUser) {
    throw new AuthenticationError("You must be logged in");
  }
  return next(root, args, ctx, info);
};

module.exports = {
  Query: {
    me: authenticated((root, args, ctx) => ctx.currentUser),
    getPins: async (root, args, ctx) => {
      //passing empty filter gets all pins
      const pins = await Pin.find({})
        .populate("author")
        .populate("comments.author");
      return pins;
    },
  },

  Mutation: {
    createPin: authenticated(async (root, args, ctx) => {
      const newPin = await new Pin({
        ...args.input,
        author: ctx.currentUser._id,
      }).save();
      const pinAdded = await Pin.populate(newPin, "author");
      return pinAdded;
    }),
    deletePin: authenticated(async (root, args, ctx) => {
      const pinDeleted = await Pin.findOneAndDelete({ _id: args.pinId }).exec();
      return pinDeleted;
    }),
    createComment: authenticated(async (root, args, ctx) => {
      const newComment = { text: args.text, author: ctx.currentUser._id };
      const pinUpdated = await Pin.findOneAndUpdate(
        // filter: find pin by its _id
        { _id: args.pinId },
        //how to update this particular document. $push operator to push onto the comments array our newComment
        { $push: { comments: newComment } },
        //return latest document from findOneAndUpdate
        { new: true }
      )
        .populate("author")
        .populate("comments.author");
      return pinUpdated;
    }),
  },
};

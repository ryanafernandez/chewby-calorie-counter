const { AuthenticationError } = require('apollo-server-express');
const { User, LoggedDay, Entry } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
        return User.findOne({ username }).populate('loggedDays');
    },
    loggedDays: async (parent, { username }) => {
        const params = username ? { username } : {};
        return LoggedDay.find(params).sort({ createdAt: -1 });
    },
    loggedDay: async (parent, { loggedDayId }) => {
        return LoggedDay.findOne({ _id: loggedDayId });
    },
    entry: async (parent, { entryId }) => {
        return Entry.findOne({ _id: entryId });
    },
    entries: async (parent, { loggedDayAuthor }) => {
        const params = loggedDayAuthor ? { loggedDayAuthor } : {};
        return Entry.find(params);
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
    },
    login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });

        if (!user) {
            throw new AuthenticationError('No user found with this email address');
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
            throw new AuthenticationError('Incorrect credentials');
        }

        const token = signToken(user);

        return { token, user };
    },
    addLoggedDay: async (parent, { loggedDayAuthor }) => {
        const loggedDay = await LoggedDay.create({ loggedDayAuthor });

        await User.findOneAndUpdate(
            { username: loggedDayAuthor },
            { $addToSet: { loggedDays: loggedDay._id }}
        );

        return loggedDay;
    },
    addEntry: async (parent , { item, calories, loggedDayId }) => {
        await LoggedDay.findOneAndUpdate(
            { _id: loggedDayId }, // find the day asdf }
            { $addToSet: { entries: { item: item, calories: calories } }}
        );

        const loggedDay = await LoggedDay.findById( loggedDayId );
        return loggedDay;
    },
    removeEntry: async (parent, { entryId, loggedDayId }) => {
        await LoggedDay.findOneAndUpdate(
            { _id: loggedDayId },
            { $pull: { entries: { _id: entryId } } },
        );

        const loggedDay = await LoggedDay.findById( loggedDayId );
        return loggedDay;
    },
  },
};

module.exports = resolvers;

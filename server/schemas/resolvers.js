const { AuthenticationError } = require('apollo-server-express');
const { User, LoggedDay } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
        return User.findOne({ username });
    },
    loggedDays: async (parent, { username }) => {
        const params = username ? { username } : {};
        return LoggedDay.find(params).sort({ createdAt: -1 });
    },
    loggedDay: async (parent, { loggedDayId }) => {
        return LoggedDay.findOne({ _id: loggedDayId });
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
    addLoggedDay: async (parent, { entry, loggedDayAuthor }) => {
        const loggedDay = await LoggedDay.create({ entry, loggedDayAuthor });

        await User.findOneAndUpdate(
            { username: loggedDayAuthor },
            { $addToSet: { loggedDays: loggedDay._id }}
        );

        return loggedDay;
    },
  },
};

module.exports = resolvers;

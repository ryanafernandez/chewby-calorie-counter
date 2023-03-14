const { AuthenticationError } = require('apollo-server-express');
const { User, LoggedDay, Entry } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
        if (context.user) {
            return User.findOne({ _id: context.user._id }).populate('loggedDays');
        }
        throw new AuthenticationError('(query.me): You need to be logged in!');
    },
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
    loggedDay: async (parent, { loggedDay, loggedDayAuthor }) => {
        return LoggedDay.findOne({ loggedDay, loggedDayAuthor });
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
    addLoggedDay: async (parent, { loggedDay, loggedDayAuthor }, context) => {
        if (context.user) {
            const newLoggedDay = await LoggedDay.create({ loggedDay, loggedDayAuthor });

            await User.findOneAndUpdate(
                { username: loggedDayAuthor },
                { $addToSet: { loggedDays: newLoggedDay._id }}
            );

            return newLoggedDay;
        }
        throw new AuthenticationError('You need to be logged in!');
    },
    addEntry: async (parent , { item, calories, loggedDay, loggedDayAuthor }, context) => {
        console.log(`Adding ${item} (${calories} calories) to ${loggedDayAuthor}\'s log for ${loggedDay}.`);
        if (context.user) {
            
            await LoggedDay.findOneAndUpdate(
                { 
                    loggedDay: loggedDay,
                    loggedDayAuthor: loggedDayAuthor,
                }, // find the day to log by day and author
                { $addToSet: { entries: { item: item, calories: calories } }}
            );

            const updatedLoggedDay = await LoggedDay.findOne( {
                    loggedDay, loggedDayAuthor
                });
            return updatedLoggedDay;
        }
        throw new AuthenticationError('You need to be logged in!');
    },
    removeEntry: async (parent, { entryId, loggedDayId }, context) => {
        if (context.user) {
            await LoggedDay.findOneAndUpdate(
                { _id: loggedDayId },
                { $pull: { entries: { _id: entryId } } },
            );
    
            const loggedDay = await LoggedDay.findById( loggedDayId );
            return loggedDay;
        }
        throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;

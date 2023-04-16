const { AuthenticationError } = require('apollo-server-express');
const { User, Goals, LoggedDay, Entry } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
        if (context.user) {
            return User.findOne({ _id: context.user._id }).populate('loggedDays');
        }
        throw new AuthenticationError('You need to be logged in to do that!');
    },
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
        return User.findOne({ username }).populate('loggedDays');
    },
    goal: async (parent, { user_id }) => {
        return Goals.findOne({ user_id});
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
    addGoals: async (parent, { user_id }, context) => {
        if (context.user) {
            const newGoals = await Goals.create({ calorie_goal, user_id });

            return newGoals;
        }
        throw new AuthenticationError('You need to be logged in!');
    },
    updateGoals: async (parent, { calorie_goal, user_id }, context) => {
        if (context.user) {
            const newGoal = await Goals.findOneAndUpdate(
                { user_id: user_id },
                { $set: { calorie_goal: calorie_goal }},
                { returnDocument: "after" },
            );

            return newGoal;
        }
        throw new AuthenticationError('You need to be logged in!');
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
            
            // Looking for loggedDay, if it exists, then update. Else, findThis is null
            const findThis = await LoggedDay.findOneAndUpdate(
                { 
                    loggedDay: loggedDay,
                    loggedDayAuthor: loggedDayAuthor,
                }, // find the day to log by day and author
                { $addToSet: { entries: { item: item, calories: calories } }}
            );

            // If findThis is not null, then return the updated loggedDay
            if (findThis) {
                const updatedLoggedDay = await LoggedDay.findOne( {
                    loggedDay, loggedDayAuthor
                });
                return updatedLoggedDay;
            } else { // Else, add a new logged day, and add the entry
                // Create the new logged day
                const newLoggedDay = await LoggedDay.create({ loggedDay, loggedDayAuthor });

                await User.findOneAndUpdate(
                    { username: loggedDayAuthor },
                    { $addToSet: { loggedDays: newLoggedDay._id }}
                );

                // Add the entry
                await LoggedDay.findOneAndUpdate(
                    { 
                        loggedDay: loggedDay,
                        loggedDayAuthor: loggedDayAuthor,
                    }, // find the day to log by day and author
                    { $addToSet: { entries: { item: item, calories: calories } }}
                );

                // Return the new loggedDay
                const updatedLoggedDay = await LoggedDay.findOne( {
                    loggedDay, loggedDayAuthor
                });
                return updatedLoggedDay;
            }
            
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
    updateEntry: async (parent, { entryId, item, calories }, context) => {
        if (context.user) {
            await LoggedDay.findOneAndUpdate(
                { "entries._id": entryId },
                { $set: { "entries.$": { item: item, calories: calories } } },
            );
            
            const loggedDay = await LoggedDay.findOne(
                { "entries._id": entryId }
            );

            return loggedDay;
        }
    }
  },
};

module.exports = resolvers;

const { AuthenticationError } = require('apollo-server-express');
const { User, Goals, DayLog, Food, LoggedDay, Entry } = require('../models');
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
        return Goals.findOne({ user_id });
    },
    dayLog: async (parent, { day, user_id }) => {
        return DayLog.findOne({ day, user_id });
    },
    loggedDays: async (parent, { username }) => {
        const params = username ? { username } : {};
        return LoggedDay.find(params).sort({ createdAt: -1 });
    },
    loggedDay: async (parent, { loggedDay, loggedDayAuthor }) => {
        return LoggedDay.findOne({ loggedDay, loggedDayAuthor });
    },
    entry: async (parent, { entryId }) => {
        return Entry.find({ _id: entryId });
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
    // Creates a new Goal in Goals for the associated user_id with a default calorie_goal of 2000.
    // Returns the created Goal document.
    addGoals: async (parent, { user_id }, context) => {
        if (context.user) {
            const newGoals = await Goals.create({ user_id });

            return newGoals;
        }
        throw new AuthenticationError('You need to be logged in!');
    },
    // Updates the user's calorie_goal. Requires the user_id and for the user to be logged in.
    // Returns the updated Goal document.
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
    // Creates a new DayLog for the associated user_id.
    // Returns the created DayLog document.
    addDayLog: async (parent, { day, user_id }, context) => {
        if (context.user) {
            const search = await DayLog.findOne({ day, user_id });

            if (search == null) {
                const newDayLog = await DayLog.create({ day, user_id });
                return newDayLog;
            } else {
                return search;
            }
        }
        throw new AuthenticationError('You need to be logged in!');
    },
    addFood: async (parent, { name, calories, protein, fat, carbs, user_id }, context) => {
        if (context.user) {
            const search = await Food.findOne({ name, calories, protein, fat, carbs });

            if (search == null) {
                const newFood = await Food.create({ name, calories, protein, fat, carbs, user_id });
                return newFood;
            } else {
                return search;
            }
        }
        throw new AuthenticationError('You need to be logged in!');
    },
    addBreakfast: async (parent, { day, user_id, food_id }, context) => {
        if (context.user) {
            const food = await Food.findOne({ _id: food_id });
            console.log(food);
            const newDayLog = await DayLog.findOneAndUpdate(
                {
                    day: day,
                    user_id: user_id,
                },
                // May need to use Food model and Entry schema separately
                // Entry will have specific EntryId
                // Food model will be used for searching
                { $push: { breakfast: {
                    name: food.name,
                    calories: food.calories,
                    protein: food.protein,
                    fat: food.fat,
                    carbs: food.carbs
                } }},
                { returnDocument: "after" },
            );

            return newDayLog;
        }
        throw new AuthenticationError('You need to be logged in!');
    },
    addLunch: async (parent, { day, user_id, food_id }, context) => {
        if (context.user) {
            const food = await Food.findOne({ _id: food_id });
            console.log(food);
            const newDayLog = await DayLog.findOneAndUpdate(
                {
                    day: day,
                    user_id: user_id,
                },
                { $push: { lunch: {
                    name: food.name,
                    calories: food.calories,
                    protein: food.protein,
                    fat: food.fat,
                    carbs: food.carbs
                } }},
                { returnDocument: "after" },
            );

            return newDayLog;
        }
        throw new AuthenticationError('You need to be logged in!');
    },
    addDinner: async (parent, { day, user_id, food_id }, context) => {
        if (context.user) {
            const food = await Food.findOne({ _id: food_id });
            console.log(food);
            const newDayLog = await DayLog.findOneAndUpdate(
                {
                    day: day,
                    user_id: user_id,
                },
                { $push: { dinner: {
                    name: food.name,
                    calories: food.calories,
                    protein: food.protein,
                    fat: food.fat,
                    carbs: food.carbs
                } }},
                { returnDocument: "after" },
            );

            return newDayLog;
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
    // addEntry: async (parent , { item, calories, loggedDay, loggedDayAuthor }, context) => {
    //     console.log(`Adding ${item} (${calories} calories) to ${loggedDayAuthor}\'s log for ${loggedDay}.`);
    //     if (context.user) {
            
    //         // Looking for loggedDay, if it exists, then update. Else, findThis is null
    //         const findThis = await LoggedDay.findOneAndUpdate(
    //             { 
    //                 loggedDay: loggedDay,
    //                 loggedDayAuthor: loggedDayAuthor,
    //             }, // find the day to log by day and author
    //             { $addToSet: { entries: { item: item, calories: calories } }}
    //         );

    //         // If findThis is not null, then return the updated loggedDay
    //         if (findThis) {
    //             const updatedLoggedDay = await LoggedDay.findOne( {
    //                 loggedDay, loggedDayAuthor
    //             });
    //             return updatedLoggedDay;
    //         } else { // Else, add a new logged day, and add the entry
    //             // Create the new logged day
    //             const newLoggedDay = await LoggedDay.create({ loggedDay, loggedDayAuthor });

    //             await User.findOneAndUpdate(
    //                 { username: loggedDayAuthor },
    //                 { $addToSet: { loggedDays: newLoggedDay._id }}
    //             );

    //             // Add the entry
    //             await LoggedDay.findOneAndUpdate(
    //                 { 
    //                     loggedDay: loggedDay,
    //                     loggedDayAuthor: loggedDayAuthor,
    //                 }, // find the day to log by day and author
    //                 { $addToSet: { entries: { item: item, calories: calories } }}
    //             );

    //             // Return the new loggedDay
    //             const updatedLoggedDay = await LoggedDay.findOne( {
    //                 loggedDay, loggedDayAuthor
    //             });
    //             return updatedLoggedDay;
    //         }
            
    //     }
    //     throw new AuthenticationError('You need to be logged in!');
    // },
    removeBreakfast: async (parent, { entryId, dayLogId }, context) => {
        if (context.user) {
            const updatedDayLog = await DayLog.findOneAndUpdate(
                { _id: dayLogId },
                { $pull: { breakfast: { _id: entryId } } },
                { returnDocument: "after" },
            );
    
            return updatedDayLog;
        }
        throw new AuthenticationError('You need to be logged in!');
    },
    removeLunch: async (parent, { entryId, dayLogId }, context) => {
        if (context.user) {
            const updatedDayLog = await DayLog.findOneAndUpdate(
                { _id: dayLogId },
                { $pull: { lunch: { _id: entryId } } },
                { returnDocument: "after" },
            );
    
            return updatedDayLog;
        }
        throw new AuthenticationError('You need to be logged in!');
    },
    removeDinner: async (parent, { entryId, dayLogId }, context) => {
        if (context.user) {
            const updatedDayLog = await DayLog.findOneAndUpdate(
                { _id: dayLogId },
                { $pull: { dinner: { _id: entryId } } },
                { returnDocument: "after" },
            );
    
            return updatedDayLog;
        }
        throw new AuthenticationError('You need to be logged in!');
    },
    updateBreakfast: async (parent, { entryId, dayLogId, name, calories, protein, fat, carbs }, context) => {
        if (context.user) {
            const updatedDayLog = await DayLog.findOneAndUpdate(
                { "breakfast._id": entryId },
                { $set: { "breakfast.$": { name: name, calories: calories, protein: protein, fat: fat, carbs: carbs }}},
                { returnDocument: "after" },
            );

            return updatedDayLog;
        }
        throw new AuthenticationError('You need to be logged in!');
    },
    updateLunch: async (parent, { entryId, dayLogId, name, calories, protein, fat, carbs }, context) => {
        if (context.user) {
            const updatedDayLog = await DayLog.findOneAndUpdate(
                { "lunch._id": entryId },
                { $set: { "lunch.$": { name: name, calories: calories, protein: protein, fat: fat, carbs: carbs }}},
                { returnDocument: "after" },
            );

            return updatedDayLog;
        }
        throw new AuthenticationError('You need to be logged in!');
    },
    updateDinner: async (parent, { entryId, dayLogId, name, calories, protein, fat, carbs }, context) => {
        if (context.user) {
            const updatedDayLog = await DayLog.findOneAndUpdate(
                { "dinner._id": entryId },
                { $set: { "dinner.$": { name: name, calories: calories, protein: protein, fat: fat, carbs: carbs }}},
                { returnDocument: "after" },
            );

            return updatedDayLog;
        }
        throw new AuthenticationError('You need to be logged in!');
    }
  },
};

module.exports = resolvers;

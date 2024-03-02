const Model = require('./model');

const addChat = (chat) => {
    const myChat = new Model(chat);
    return myChat.save();
}

const listChats = async (userId) => {
    let filter = {};
    if (userId) {
        filter = {
            users: userId,
        }
    }
    try {
        const populated = await Model.find(filter)
            .populate('users')
            .exec();
        return populated;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    add: addChat,
    list: listChats,
}
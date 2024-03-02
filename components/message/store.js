// const db = require('mongoose');
const Model = require('./model');
// require('dotenv').config();
// db.connect(process.env.DB_HOST);

// console.log('[db] Conectada con éxito');
const addMessage = (message) => {
    // list.push(message);
    const myMessage = new Model(message);
    myMessage.save();
}

const getMessages = async(filterUser) => {
    let filter = {};

    if (filterUser !== null) {
        filter = { user: filterUser };
    }

    try {
        const populated = await Model.find(filter)
        .populate('user')
        .exec();
        return populated;
    } catch (error) {
        throw new Error(error);
    }
}

const updateText = async (id, message) => {
    const foundMessage = await Model.findOne({
        _id: id
    });

    foundMessage.message = message;
    const newMessage = await foundMessage.save();
    return newMessage;
}

const removeMessage = (id) => {
    return Model.deleteOne({
        _id: id
    })
}

module.exports = {
    add: addMessage,
    list: getMessages,
    updateText: updateText,
    remove: removeMessage,
}
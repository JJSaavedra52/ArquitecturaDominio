const store = require('./store');

const addUser = (name) => {
    if (!name) {
        return Promise.reject('Invalid name');
    } else {
        const user = {
            name,
        };
        return store.add(user);
    }
}

const getUsers = () => {
    return store.list();
}

module.exports = {
    addUser,
    getUsers,
};
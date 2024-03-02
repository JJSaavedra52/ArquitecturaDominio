const store = require('./store');

const addMessage = (chat, user, message, file) => {
    return new Promise((resolve, reject) => {
        if (!chat || !user || !message) {
            console.error('[messageController] No hay usuario o mensaje');
            return reject('Los datos son incorrectos');
        } else {
            let fileUrl = '';
            if (file) {
                fileUrl = 'http://localhost:3000/app/files/' + file.filename;
            }

            const fullMessage = {
                chat: chat,
                user: user,
                message: message,
                date: new Date(),
                file: fileUrl,
            };
            store.add(fullMessage);
            resolve(fullMessage);
        }
    })
}

const getMessages = (filterUser) => {
    return new Promise((resolve, reject) => {
        resolve(store.list(filterUser));
    })
}

const updateMessage = (id, message) => {
    return new Promise(async (resolve, reject) => {
        console.log(id);
        console.log(message);
        if (!id || !message) {
            return reject('Invalid data');
        } else {
            const res = await store.updateText(id, message);
            resolve(res);
        }
    })
}

const deleteMessage = (id) => {
    return new Promise((resolve, reject) => {
        if (!id) {
            return reject('Id invalido');
        } else {
            store.remove(id)
                .then(() => {
                    resolve();
                })
                .catch(e => {
                    reject(e);
                })
        }
    });
}

module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage,
};
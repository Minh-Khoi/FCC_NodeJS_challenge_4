const process = require('process');
const rootDir = process.cwd();

const User = require(rootDir + '/classes/models/User.js');

async function insertUser(userObjBody) {
    let userObj = {
        username: userObjBody.username,
    };
    return await User.User.create(userObj);
}

async function getAllUsers() {
    return await User.User.find({});
}

async function getUserByIDToObject(id_) {
    let user_ = await User.User.findOne({ _id: id_ });
    let { username, _id } = user_.toObject({ versionKey: false });
    return { username, _id };
}

module.exports = { insertUser , getAllUsers, getUserByIDToObject};
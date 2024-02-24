const process = require('process');
const rootDir = process.cwd();

const Exercise = require(rootDir + '/classes/models/Exercise.js').Exercise;

async function insertExercise(excBody) {
    let excObj = {
        username: excBody.username,
        description: excBody.description,
        duration: excBody.duration,
        date: excBody.date,
        _id: excBody[':_id']
    };
    return await Exercise.create(excObj);
}

async function readAndCountAllExercisesByUserID(id, from = 0, to = Number.MAX_SAFE_INTEGER, limit = 0) {
    let arrayOfModels = await Exercise.find({ _id: id, date: { $gt: from, $lt: to } });
    if (limit != 0) {
        arrayOfModels = arrayOfModels.limit(limit);
    }
    let arrayOfRes = arrayOfModels.map(resu => ({
        description: resu.description,
        duration: resu.duration,
        date: new Date(resu.date).toDateString(),
    }));
    return {count : arrayOfRes.length ,log: arrayOfRes};
}

module.exports = { insertExercise, readAndCountAllExercisesByUserID };
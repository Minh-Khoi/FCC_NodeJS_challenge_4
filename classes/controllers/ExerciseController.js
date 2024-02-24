const process = require('process');
const rootDir = process.cwd();

const Exercise = require(rootDir + '/classes/models/Exercise.js').Exercise;

async function insertExercise(excBody) {
    try {
        let excObj = {
            username: excBody.username,
            description: excBody.description,
            duration: excBody.duration,
            date: Boolean(excBody.date) ? new Date(excBody.date) : new Date(),
            _id: excBody[':_id']
        };
        return await Exercise.create(excObj);
    } catch (e) {
        console.error('An error occurred:', e.message);
    }
    
}

async function readAndCountAllExercisesByUserID(username, from , to, limit ) {
    let arrayOfModels ;
    if (limit != 0) {
        arrayOfModels = await Exercise.find({ 'username': username, date: { $gt: from, $lt: to } }).limit(limit);
    } else {
        arrayOfModels = await Exercise.find({ 'username': username, date: { $gt: from, $lt: to } });
    }
    let arrayOfRes = arrayOfModels.map(resu => ({
        description: resu.description,
        duration: resu.duration,
        date: new Date(resu.date).toDateString(),
    }));
    // console.log(arrayOfRes);
    return {count : arrayOfRes.length ,log: arrayOfRes};
}

module.exports = { insertExercise, readAndCountAllExercisesByUserID };
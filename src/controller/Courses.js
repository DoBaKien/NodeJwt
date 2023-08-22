const Course = require("../modal/course")


let getAllUsers = async (req, res, next) => {
    Course.find({})
        .then((courses) => {
            res.status(200).json(courses)
        })
        .catch(next);
}

let createNewUser = async (req, res, next) => {
    const course = new Course(req.body);
    course
        .save()
        .then(() => res.status(200).json({
            message: 'ok'
        }))
        .catch(next);
}

let updateUser = async (req, res, next) => {
    // return res.send({ mds: req.params.id });
    Course.updateOne({ _id: req.params.id }, req.body)
        .then(() => res.status(200).json(
            { message: 'ok' }
        ))
        .catch(next);
}

let deleteUser = async (req, res, next) => {
    Course.delete({ _id: req.params.id })
        .then(() => res.status(200).json(
            { message: 'ok' }
        ))
        .catch(next);
}

module.exports = {
    getAllUsers, createNewUser, updateUser, deleteUser
}

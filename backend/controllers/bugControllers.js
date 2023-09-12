import mongoose from "mongoose";
import Bug from "../models/bugModel.js"

// get all the bug reports
export async function getReports(req, res) {
    // get all the reports
    try {
        // save the response after fetching all data
        const reports = await Bug.find({}).sort({ createdAt: -1 });
        // responsd to the client with the data
        res.status(200).json(reports);
    } catch (error) {
        // respond to the client with an error
        res.status(400).json({ error: error.message })
    }
}

// get a specific bug report
export async function getReport(req, res) {
    // id parameter from request
    const { id } = req.params

    // check if the id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: "The requested bug report does not exist!" })
        return;
    }

    // use the id to fetch the report from db
    try {
        // fetch the report
        const report = await Bug.findOne({ _id: id })
        // respond to the client with the date
        res.status(200).json(report);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// create a new bug report
export async function createReport(req, res) {
    // destructure the request's body
    const { title, description } = req.body
    // empty fields validation
    const emptyFields = [];

    if (!title) emptyFields.push('title');
    if (!description) emptyFields.push('description');

    // use the request's info to create and save report to db
    const author = req.user.username;

    try {
        // create + save the bug to db
        const response = await Bug.create({ title, description, author });
        // send the result to the client
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: "Please fill out all fields", emptyFields })
    }
}

// delete a bug report
export async function deleteReport(req, res) {
    // id parameter from request
    const { id } = req.params

    // check if the id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: "The requested bug report does not exist!" })
        return;
    }

    // use the id to delete the specified document
    try {
        // delete the document from db
        const response = await Bug.findOneAndDelete({ _id: id })
        // respond to the client with the success object 
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// update a bug report
export async function updateReport(req, res) {
    // id parameter from request
    const { id } = req.params

    // get the update info from the request's body
    const { title, description } = req.body

    // check if the id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: "The requested bug report does not exist!" })
        return;
    }

    // fetch the target document and update it using the id and content above
    try {
        // fetch and update
        const response = await Bug.findOneAndUpdate({ _id: id }, { title, description })
        // respond with the success object
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
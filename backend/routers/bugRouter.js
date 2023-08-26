import express from "express"
import {
    getReports,
    getReport,
    createReport,
    updateReport,
    deleteReport
} from "../controllers/bugControllers.js"
import { requireAuth } from "../middleware/requireAuth.js";

// creating a router from the Router contructor
const bugRouter = express.Router()

// require the user to be logged in to access routes
bugRouter.use(requireAuth);

// all bug reports
bugRouter.get('/', getReports)

// create bug report
bugRouter.post('/', createReport)

// get a specific report
bugRouter.get('/:id', getReport)

// delete a report
bugRouter.delete('/:id', deleteReport)

// update a report
bugRouter.patch('/:id', updateReport)

export default bugRouter
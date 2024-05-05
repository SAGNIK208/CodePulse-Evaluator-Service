import express from 'express';

import { addSubmission } from '../../controllers/submissionController';

const submissionRouter = express.Router();

submissionRouter.post('/', addSubmission);

export default submissionRouter;

import express from 'express';

import { addSubmission } from '../../controllers/submissionController';
import { createSubmissionZodSchema } from '../../dtos/CreateSubmissionDTO';
import { validate } from '../../validators/zodValidator';

const submissionRouter = express.Router();

submissionRouter.post('/', validate(createSubmissionZodSchema), addSubmission);

export default submissionRouter;

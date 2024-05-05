import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';

import { CreateSubmissionDTO } from '../dtos/CreateSubmissionDTO';

export const addSubmission = (req: Request, res: Response) => {
  const submissionDto = req.body as CreateSubmissionDTO;
  return res.status(HttpStatus.CREATED).json({
    success: true,
    error: {},
    message: 'Successfully collected the submission',
    data: submissionDto,
  });
};

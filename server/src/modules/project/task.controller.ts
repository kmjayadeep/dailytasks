import { Request, Response } from 'express';
import {
  RESPONSE_SUCCESS,
  ERORR_INTERNAL_SERVER_ERROR,
} from '../../helpers/responseCodes';
import { addTaskToProject } from '../../models/project';
const debug = require('debug')('app:task.controller');

export const addTask = async (req: Request, res: Response) => {
  const task = req.body;
  const projectId = req.params.projectId;

  const { name, description, date } = task;

  debug('adding new task to project', projectId);

  const projectObj = await addTaskToProject(projectId, {
    name,
    description,
    date
  });

  return res.json({
    code: RESPONSE_SUCCESS,
    data: projectObj,
  });
};

export const deleteTask = async (req: Request, res: Response) => {
  // const projectId = req.params.projectId;
  // const project = await Project.findOne({ projectId }).exec();

  return res.json({
    code: RESPONSE_SUCCESS,
    // data: projects,
  });
};

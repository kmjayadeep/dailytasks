import { Request, Response } from 'express';

import {
  sendSuccessResponse,
  sendValidationError,
} from '../../helpers/response';

import { addTaskToProject, deleteTaskFromProject, editTaskInProject } from '../../models/project';
const debug = require('debug')('app:task.controller');

export const addTask = async (req: Request, res: Response) => {
  const task = req.body;
  const projectId = req.params.projectId;

  const { name, description, date } = task;

  if (!name) {
    return sendValidationError(res, { message: 'name is required' });
  }

  debug('adding new task to project', projectId);

  const projectObj = await addTaskToProject(projectId, {
    name,
    description,
    date,
  });

  sendSuccessResponse(res, projectObj);
};


export const deleteTask = async (req: Request, res: Response) => {
  const { projectId, taskId } = req.params;
  const project = await deleteTaskFromProject(projectId, taskId);

  sendSuccessResponse(res, { project });
};

export const editTask = async (req: Request, res: Response) => {
  const { projectId, taskId } = req.params;

  const task = req.body;

  const project = await editTaskInProject(projectId, taskId, task);
  sendSuccessResponse(res, { project });
};


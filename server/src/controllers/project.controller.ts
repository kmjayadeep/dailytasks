import {Request, Response} from 'express';
import {RESPONSE_SUCCESS} from '../helpers/responseCodes';
import Project from '../models/project';

export const addProject = async (req: Request, res: Response) => {
  const project = req.body;

  const projectObj = new Project(project);
  await projectObj.save();

  return res.json({
    code: RESPONSE_SUCCESS,
    data: projectObj,
  });
};

export const getProjects = async (_req: Request, res: Response) => {

  const projects = await Project.find({}).exec();

  return res.json({
    code: RESPONSE_SUCCESS,
    data: projects,
  });
};

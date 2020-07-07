import { Request, Response } from 'express';
import {
  RESPONSE_SUCCESS,
  ERORR_INTERNAL_SERVER_ERROR,
} from '../../helpers/responseCodes';
import Project from '../../models/project';

export const addProject = async (req: Request, res: Response) => {
  const project = req.body;

  const projectObj = new Project(project);

  try {
    await projectObj.save();
    return res.json({
      code: RESPONSE_SUCCESS,
      data: projectObj,
    });
  } catch (err) {
    return res.status(500).json({
      code: ERORR_INTERNAL_SERVER_ERROR,
    });
  }
};

export const getProjects = async (_req: Request, res: Response) => {
  const projects = await Project.find({}).exec();

  return res.json({
    code: RESPONSE_SUCCESS,
    data: projects,
  });
};

export const editProject = async (req: Request, res: Response) => {
  const project = req.body;
  const result = await Project.findOneAndUpdate(
    {
      _id: req.params.projectId,
    },
    project,
    { new: true }
  );

  return res.json({
    code: RESPONSE_SUCCESS,
    data: result,
  });
};

export const deleteProject = async (req: Request, res: Response) => {
  const deleted = await Project.findOneAndDelete({
    _id: req.params.projectId,
  });

  return res.json({
    code: RESPONSE_SUCCESS,
    data: deleted,
  });
};

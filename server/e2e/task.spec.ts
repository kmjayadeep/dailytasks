import { Express } from 'express';
import request from 'supertest';
import { expect } from 'chai';
import { boostrap, shutdown } from '../src/app';
import { IProject } from '../src/models/project';

describe.only('Task', function () {
  let app: Express;
  let project: IProject;

  const dummyProject = {
    name: 'awesome project',
  };

  const dummyTask = {
    name: 'task1',
    description: 'boos',
    date: Date.now(),
  };

  before(async function () {
    this.timeout(5000);
    app = await boostrap();
    const response = await request(app)
      .post('/api/project')
      .send(dummyProject)
      .set('Accept', 'application/json');
    project = response.body.data;
  });

  after(async () => {
    await shutdown();
  });

  describe('POST /api/project/:projectId/task', () => {
    it('adds new task', async () => {
      const response = await request(app)
        .post(`/api/project/${project._id}/task`)
        .send(dummyTask)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      const p = response.body.data;
      expect(p.tasks.length).to.equal(1);
      expect(p.tasks[0].name).to.equal(dummyTask.name);
      expect(p.tasks[0].done).to.equal(false);
    });
  });
});

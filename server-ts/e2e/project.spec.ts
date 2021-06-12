import { Express } from 'express';
import request from 'supertest';
import { expect } from 'chai';
import { boostrap, shutdown } from '../src/app';

describe('Projects', function () {
  let app: Express;

  before(async () => {
    app = await boostrap();
  });

  after(async () => {
    await shutdown();
  });

  const dummyProject = {
    name: 'awesome project',
  };

  describe('POST /api/project', () => {
    it('adds new project', async () => {
      const response = await request(app)
        .post('/api/project')
        .send(dummyProject)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      const project = response.body.data;
      expect(project._id).to.not.empty;
      expect(project.archived).to.equal(false);
      expect(project.name).to.equal(dummyProject.name);
    });
  });

  describe('GET /api/project', () => {
    it('returns all projects', async () => {
      const response = await request(app)
        .get('/api/project')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      const projects = response.body.data;
      expect(projects.length).to.greaterThan(0);
    });
  });
});

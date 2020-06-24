import { Express } from 'express';
import request from 'supertest';
import { expect } from 'chai';
import { boostrap } from '../src/app';

describe('Projects', function () {
  let app: Express;

  before(async () => {
    app = await boostrap();
  });

  describe('POST /api/project', () => {
    it('responds with json', async () => {
      const dummyProject = {
        name: 'awesome project',
      };

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
});

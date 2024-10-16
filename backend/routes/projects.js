import {
  createProject,
  getAllProjects,
  getProject,
  modifyProject,
} from '../controllers/projects.js';

import express from 'express';

const router = express.Router();

router.get('/', getAllProjects);
router.get('/:id', getProject);
router.put('/:id', modifyProject);
router.post('/', createProject);

export default router;

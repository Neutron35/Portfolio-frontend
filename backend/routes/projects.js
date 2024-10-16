import {
  createProject,
  getAllProjects,
  getProject,
} from '../controllers/projects.js';

import express from 'express';

const router = express.Router();

router.get('/', getAllProjects);
router.get('/:id', getProject);
router.post('/', createProject);

export default router;

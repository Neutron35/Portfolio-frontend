import {
  createProject,
  getAllProjects,
  getProject,
  modifyProject,
} from '../controllers/projects.js';

import auth from '../middleware/auth.js';
import express from 'express';

const router = express.Router();

router.get('/', getAllProjects);
router.get('/:id', getProject);
router.put('/:id', auth, modifyProject);
router.post('/', auth, createProject);

export default router;

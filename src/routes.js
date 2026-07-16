import express from 'express';

import { showHomePage } from './controllers/home.js';
import { organizationsPage } from './controllers/organizations.js';
import { projectsPage } from './controllers/projects.js';
import { categoriesPage } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', organizationsPage);
router.get('/projects', projectsPage);
router.get('/categories', categoriesPage);

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;
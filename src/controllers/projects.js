import { getAllProjects } from '../models/projects.js'; // Import the getAllPr the projects model

const projectsPage = async (req, res) => {
    const projects = await getAllProjects();
    const title = 'Service Projects';
    res.render('projects', { title, projects });
};

export { projectsPage };
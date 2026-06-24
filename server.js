import express from 'express'; // Import the Express framework to create the server
import { fileURLToPath } from 'url'; // Import the fileURLToPath function to convert file URLs to file paths
import path from 'path'; // Import the path module to work with file and directory paths
import { testConnection } from './src/models/db.js';

import { getAllOrganizations } from './src/models/organizations.js';
import { getAllProjects } from './src/models/projects.js'; // Import the getAllPr the projects model


const __filename = fileURLToPath(import.meta.url); // Get the file path of the current module
const __dirname = path.dirname(__filename); // Get the directory name of the current module file

// Define the application environment
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';

// Define the port number the server will listen on
const PORT = process.env.PORT || 3000;

const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Tell Express where to find your templates
app.set('views', path.join(__dirname, 'src/views'));

app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory
/* 
This code tells Express that any file in your public directory should be accessible directly through
 your website. For example, your CSS file at public/css/main.css will be available at 
 http://127.0.0.1:3000/css/main.css. Notice that the public part is not included in the URL.
*/


/**
 * Routes
 */
app.get('/', async (req, res) => {
    const title = 'Home';
    res.render('home', { title });
});

app.get('/organizations', async (req, res) => {
    const organizations = await getAllOrganizations();

    const title = 'Our Partner Organizations';
    res.render('organizations', { title, organizations });
});

app.get('/projects', async (req, res) => {
    try {
        const projects = await getAllProjects();
        const title = 'Service Projects';
        res.render('projects', { title, projects });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).send('Server error');
    }
});

app.listen(PORT, async () => {
  try {
    await testConnection();
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
});
import express from 'express'; // Import the Express framework to create the server
import { fileURLToPath } from 'url'; // Import the fileURLToPath function to convert file URLs to file paths
import path from 'path'; // Import the path module to work with file and directory paths
import { testConnection } from './src/models/db.js';

import { getAllOrganizations } from './src/models/organizations.js';
import { getAllProjects } from './src/models/projects.js'; // Import the getAllPr the projects model
import { getAllCategories } from './src/models/categories.js'; // Import the getAllCategories function from the categories model

const __filename = fileURLToPath(import.meta.url); // Get the file path of the current module
const __dirname = path.dirname(__filename); // Get the directory name of the current module file

// Middleware to log all incoming requests
app.use((req, res, next) => {
    if (NODE_ENV === 'development') {
        console.log(`${req.method} ${req.url}`);
    }
    next(); // Pass control to the next middleware or route
});
// Middleware to make NODE_ENV available to all templates
app.use((req, res, next) => {
    res.locals.NODE_ENV = NODE_ENV;
    next();
});


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
    const projects = await getAllProjects();
    const title = 'Service Projects';
    res.render('projects', { title, projects });
});

app.get('/categories', async (req, res) => {
    const categories = await getAllCategories();
    
    const title = 'Categories';
    res.render('categories', { title, categories });
});

// Catch-all route for 404 errors
app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

// Global error handler
app.use((err, req, res, next) => {
    // Log error details for debugging
    console.error('Error occurred:', err.message);
    console.error('Stack trace:', err.stack);
    
    // Determine status and template
    const status = err.status || 500;
    const template = status === 404 ? '404' : '500';
    
    // Prepare data for the template
    const context = {
        title: status === 404 ? 'Page Not Found' : 'Server Error',
        error: err.message,
        stack: err.stack
    };
    
    // Render the appropriate error template
    res.status(status).render(`errors/${template}`, context);
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
import db from './db.js'; // Import the database connection pool

const getAllOrganizations = async () => {
    const query = `
    SELECT organization_id, name,
    description, contact_email,logo_filename FROM public.organization;
    `;
    const result = await db.query(query);
    return result.rows;
}

export { getAllOrganizations }; // Export the function to be used in other parts of the application 
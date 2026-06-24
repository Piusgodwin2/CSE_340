import db from "./db.js";

const getAllCategories = async () => {
    const query = `
    SELECT
    c.category_id,
    c.name AS category_name
    FROM public.categories c
    ORDER BY c.name ASC;
    `;
    const result = await db.query(query);
    return result.rows;
}
export{getAllCategories};
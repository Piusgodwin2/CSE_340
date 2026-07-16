import { getAllCategories } from '../models/categories.js'; // Import the getAllCategories function from the categories model

const categoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    
    const title = 'Categories';
    res.render('categories', { title, categories });
};

export { categoriesPage };
const Category = require('../model/category');

const getAllCategory = async (req, res) => {
    try {
        const categories = await Category.find({isdeleted: false});
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
}

const getCategoryById = async (req, res) => {
    try {
        const {id} = req.params;
        const category = await Category.findById(id);
        if(category === null) {
            res.status(404).json({message: 'Category not found'});
        } else {
            res.status(200).json(category);
        }
    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
}

const createCategory = async (req, res) => {
    try {
        const {name} = req.body;
        await Category.create({name: name});
        res.status(200).json({message: 'Category created successfully'});
    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
}

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        await Category.findByIdAndUpdate(id, {name: name},{new: true});
        res.status(200).json({message: 'Category updated successfully'});
    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
}

const deleteCategory = async (req, res) => {
    try {
        const {id} = req.params;
        const category = await Category.findById(id);

        category.isdeleted = !category.isdeleted;
        category.save();
        res.status(200).json({message: 'Category deleted successfully'});
    } catch(error) {
        res.status(500).json({message: 'Internal server error' + error});
    }
}

module.exports = {
    getAllCategory,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}

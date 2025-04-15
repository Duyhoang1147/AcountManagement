const Author = require('../model/author');

// Lấy 
const getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.find({isdelete: false});
        res.status(200).json({message: 'Author found', authors});
    } catch(error) {
        res.status(500).json({message: 'Internal server error'});
    }
}

const getAuthorbyId = async (req, res) => {
    try {
        const {id} = req.params;
        const author = await Author.findOne({_id: id, isdelete: false}).select('name decriptions');
        if(author === null) {
            res.status(404).json({message: 'Author not found'});
        } else {
            res.status(200).json({message: 'Author found', author});
        }
    } catch(error) {
        res.status(400).json({message: 'Author not found'});
    }
}

const createAuthor = async (req, res) => {
    try {
        const {name,decription} = req.body;
        const newAuthor = await Author.create({
            name: name,
            decriptions: decription
        })
        res.status(200).json({message: 'Author created'})
    }catch (error) {
        res.status(400).json({message: 'Author not created'});
    }
}

const updateAuthor = async (req, res) => {
    try {
        const {name, decription} = req.body;
        const {id} = req.params;
        await Author.findByIdAndUpdate(
            id, { name: name, decriptions: decription}, 
            {new: true}
        );
        res.status(200).json({message: 'Author updated'});
    } catch (error) {
        res.status(400).json({message: 'Author not updated'});
    }
}

const deleteAuthor = async (req, res) => {
    try {
        const {id} = req.params;
        const deleteAuthor = await Author.findById(id);
        if(deleteAuthor === null) {
            res.json({message: 'author not found'});
        } else {
            deleteAuthor.isdelete = !deleteAuthor.isdelete
            await deleteAuthor.save();
            res.json({message: 'author deleted'});
        }
    } catch (error) {
        res.json({message: 'author not delete'});   
    }
}

module.exports = {
    getAllAuthors,
    getAuthorbyId,
    createAuthor,
    updateAuthor,
    deleteAuthor
}


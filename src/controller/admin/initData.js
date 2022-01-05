const Category= require('../../models/category')
const Product = require('../../models/product')
// const {createCategories} = require('../category')

const createCategories = (categories, parentId = null) => {
    const categoryList = [];
    let category;
    if (parentId === null) {
        category = categories.filter(cat => cat.parentId == undefined)
    } else {
        category = categories.filter(cat => cat.parentId == parentId)

    }

    for (let cate of category) {


        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId,
            categoryImage: cate.categoryImage,
            children: createCategories(categories, cate._id)

        });
    }
    return categoryList;

};

const initialData = async (req, res) => {
    const categories = await Category.find({}).exec();
    const products = await Product.find({})
        // .populate('category')
        // .populate({path:'category', select:'_id name slug'})
        .exec();

    res.status(200).json({
        categories: createCategories(categories),
        products

    })

}

module.exports = {
    initialData
}
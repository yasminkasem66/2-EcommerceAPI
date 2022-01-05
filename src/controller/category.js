const slugify = require('slugify');

const Category = require('../models/category');

const createCategories =  (categories, parentId = null) => {
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

const createCategory = (req, res) => {
    console.log("req", req)
    const catobj = {
        name: req.body.name,
        // you cant repeat ur category
        slug: slugify(String(req.body.name))
    }
    if (req.file) {
        catobj.categoryImage =process.env.API+ '/public/' + req.file.filename;

    }
    if (req.body.parentId) {
        catobj.parentId = req.body.parentId
    }
    const cat = new Category(catobj);
    cat.save((err, category) => {
        if (err) return res.status(400).json({ err })
        if (category) return res.status(201).json({ category })

    })

}
const getCategories =   (req, res) => {
   Category.find({})
        .exec((err, categories) => {
            if (err)
                return res.status(400).json({ err });

            if (categories) {
                const categoryList = createCategories(categories);
                return res.status(200).json({ categoryList });
            }
        })
}


module.exports = { createCategory, getCategories}
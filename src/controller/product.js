const Product = require('../models/product');
const Category = require('../models/category');
const shortid = require('shortid');
const slugify = require('slugify');


const createProduct = (req, res) => {
        // cuz he will get picyures he wont accept json data but form data
        // const { } = req.body  name,slug ,price  , description,offer,reviews,category,createdBy
    let productPictures = [];
    if (req.files.length > 0) {
       productPictures= req.files.map(file => {
           return { img: process.env.API +'/public/'+file.filename}
        })
        
    }
    const { name, price, description, quantity, category} = req.body;
    const product = new Product({
        name, slug: slugify(name), price, description, quantity, productPictures, category, createdBy:req.user._id
        })
    
    product.save((err, product) => {
        if (err) return res.status(400).json({ err })
        if (product) return res.status(201).json({ product })

    })
    
        // return res.status(200).json({ file:req.files , body:req.body });


}
const getProducts = (req, res) => {
    Product.find({})
        .exec((err, products) => {
            if (err) return res.status(400).json({ err })

            if (products) {
                return res.status(200).json({ products })
            }
        })


}
const getProductsBySlug = (req, res) => {
    const { slug } = req.params;
    console.log(slug)
    Category.findOne({ slug: slug })
        .select('_id')
        .exec((err, category) => {
            console.log(category);
            console.log(category._id);
            if (err) return res.status(400).json({ err })

            if (category) {
                Product.find({category: category._id})
                    .exec((err, products) => {
                        if (err) return res.status(400).json({ err })

                        if (products) {
                            return res.status(200).json({
                                products,
                                productsByPrice: {
                                    under5k: products.filter((product) => product.price <=5000),
                                    under10k: products.filter((product) => product.price > 5000 && product.price <= 10000),
                                    under15k: products.filter((product) => product.price > 10000 && product.price <= 15000),
                                    under20k: products.filter((product) => product.price > 15000 && product.price <= 20000),
                                    under30k: products.filter((product) => product.price > 20000 && product.price <= 30000),
                                }
                            })
                        }
                    })
                // return res.status(200).json({ category })
            }
        })


}


module.exports = {
    createProduct,
    getProducts,
    getProductsBySlug
}
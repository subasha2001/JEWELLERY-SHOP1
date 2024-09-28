import { Router } from "express";
import asyncHandler from 'express-async-handler';
import { jewelleryType } from "../dataType";
import { ProductsModel } from "../models/products.model";
import { jewellers } from "../data";
import multer from "multer"
import path from "path";
const router = Router();

router.get("/seed", asyncHandler(
    async (req, res) => {
        const productsCount = await ProductsModel.countDocuments();
        if (productsCount > 0) {
            res.send("Seed is already done")
        }
        await ProductsModel.create(jewellers);
        res.send("Seed is Done!");
    }))

router.get("/", asyncHandler(
    async (req, res) => {
        const products = await ProductsModel.find();
        res.send(products);
    }
));

router.get('/search/:searchTerm', asyncHandler(
    async (req, res) => {
        const searchRegExp = new RegExp(req.params.searchTerm, 'i');
        const products = await ProductsModel.find({ name: { $regex: searchRegExp } })
        res.send(products);
    }
));

router.get('/metalType', asyncHandler(
    async (req, res) => {
        const metalType = await ProductsModel.aggregate([
            {
                $unwind: '$metalType'
            },
            {
                $group: {
                    _id: '$metalType'
                }
            },
            {
                $project: {
                    _id: 0,
                    name: '$_id'
                }
            }
        ]).sort({ count: -1 })
        res.send(metalType);
    }
));
router.get('/metalType/:metalTypeName', asyncHandler(
    async (req, res) => {
        const product = await ProductsModel.find({ metalType: req.params.metalTypeName })
        res.send(product);
    }
));

router.get('/category', asyncHandler(
    async (req, res) => {
        const category = await ProductsModel.aggregate([
            {
                $unwind: '$category'
            },
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    name: '$_id',
                    count: '$count'
                }
            }
        ]).sort({ count: -1 })

        const all = {
            name: 'All',
            count: await ProductsModel.countDocuments()
        }
        category.unshift(all);
        res.send(category);
    }
));

router.get('/category/:categoryName', asyncHandler(
    async (req, res) => {
        const product = await ProductsModel.find({ category: req.params.categoryName })
        res.send(product);
    }
));

router.get('/:productId', asyncHandler(
    async (req, res) => {
        const product = await ProductsModel.findById(req.params.productId)
        res.send(product);
    }
));

router.delete('/deleteProduct/:productId', (req, res) => {
    ProductsModel.deleteOne({_id: req.params.productId}).then(result=>{});
    res.status(200).json({message:'Product deleted!'});
});

router.post('/uploadImages', asyncHandler(
    async(req,res)=>{
        const imgDis = req.body.name;
        res.send(imgDis);
    }
));

router.post("/addProduct", asyncHandler(
    async (req, res) => {
        const { name, imageDis, imageHov, description, category, metalType, weight, makingCost, stoneCarat, wastage, featured } = req.body;
        const product = await ProductsModel.findOne({ name });
        if (product) {
            res.status(404).send('Product already present');
            return
        }

        const newProduct: jewelleryType = {
            id: '',
            name,
            imageDis,
            imageHov,
            description,
            metalType: metalType.toLowerCase(),
            category: category.toLowerCase(),
            weight,
            makingCost: makingCost/100,
            stoneCarat,
            wastage: wastage/100,
            featured
        }
        const dbProduct = await ProductsModel.create(newProduct);
        res.send(dbProduct);
    }
))

export default router;
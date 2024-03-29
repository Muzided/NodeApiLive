const Product = require("../models/product");
const getAllProducts = async (req, res) => {

    const { company, name, featured, sort, select, page, limit } = req.query;

    const queryObject = {}
    let apiData = Product.find(queryObject);
    // console.log('Await', apiData);
    if (company) {
        queryObject.company = company;
    }
    if (featured) {
        queryObject.name = featured;
    }
    if (name) {
        queryObject.name = { $regex: name, $options: " " };
    }
    if (sort) {
        // let sortFix = sort.replace(",", " ");
        let sortFix = sort.split(",").join(" ");

        apiData = apiData.sort(sortFix);
    }
    if (select) {
        //let selectFix = select.replace(",", " ");
        let selectFix = select.split(",").join(" ");

        apiData = apiData.select(selectFix);
    }



    if (page) {
        let pagee = Number(req.query.page) || 1;
        let limitt = Number(req.query.limit) || 3;
        console.log("pageee", pagee);
        console.log("limit", limitt);

        let skip = (pagee - 1) * limitt;
        console.log("skip", skip);
        apiData = apiData.skip(skip).limit(limitt);
    }
    const Products = await apiData;

    res.status(200).json({ Products })
}

const getAllProductsTesting = async (req, res) => {
    const Products = await Product.find(req.query)
    res.status(200).json(Products);
}

module.exports = { getAllProducts, getAllProductsTesting };
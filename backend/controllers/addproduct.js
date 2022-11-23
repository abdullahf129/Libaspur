const addp = (req,res)=>{

    // const product_id=req.body.product_id;
    // const productname = req.body.productname;
    // const price = req.body.productprice;
    // const productimage = req.body.productimage;
    // const productcategory = req.body.productcategory;
    // const update_key = req.body.update_key;
    // const active_bit = req.body.active_bit;

    res.json("from controller")

    // db.query(
    //     "INSERT INTO products (product_id, product_name , price , product_image ,category,update_key ,active_bit) VALUES (?,?,?,?,?,?,?)",
    //     [product_id, productname,price, productimage, productcategory, update_key, active_bit],
    //     (err, result) => {
    //         console.log(err);
    //     }
    // );
 }
 module.exports = addp

const express = require("express");
const router = express.Router();
const promodel =require("../modal/myproduct"); 
router.use(express.json());
// const mongoose = require("mongoose");
// mongoose.connect(process.env.mongo).then(()=>console.log("connected product"));
router.get("/",(req,res)=> res.send("Product page"));

router.post("/addproduct" ,(req,res) => {

    const pro_data = req.body;
    promodel.create(pro_data);
    return res.json({data:"inserted"});

});
router.put("/update/:product_id" , async(req,res) =>
{
    const p_id = req.params.product_id;
    const pro_update = req.body;
    const updatecmp = await promodel.findOneAndUpdate(
        {product_id: p_id}, pro_update ,
        {upsert:true}     
    );
   return res.json({data:"updated"});

});
router.delete("/dltproduct",(req,res) => {
    // const cmp = req.params.cmp;
    const dltpro = req.body.product_id;
    const deletepro = promodel.findOneAndDelete({ product_id: dltpro }, (err) => {
        if(err)
        {
            console.log(err)
        }
        else
        {
            console.log("one user deleted");
        }
    });
    return res.json({data:"deleted data"+deletepro});
});



module.exports = router;
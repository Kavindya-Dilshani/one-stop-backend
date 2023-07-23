const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

//schema 
const schemaData = mongoose.Schema({
    category: String,
    product_id: String,
    product_name: String,
    product_price: String,
},{
    timestamps :true
});

const productModel = mongoose.model("product",schemaData)



//read
//http://localhost:4000/
app.get("/get-products",async (req,res)=>{
    const data = await productModel.find({})
    res.json({success: true ,data: data})
});

//create data || save data in  mongo db
//http://localhost:4000/create
/*{
    category,
    product_id,
    product_name,
    product_price,
}*/
app.post("/create-product",async(req,res)=>{
    console.log(req.body)
    const data = new productModel(req.body)
    await data.save()
    res.send({ success: true, message : "data save successfully", data: data}) 
});

//update data
//http://localhost:4000/update
/**
 *   id: "",
 *   category: ""
  *  product_id: ""
  *  product_name: ""
  *  product_price: ""
 */
app.put("/update-product",async(req,res)=>{
    console.log(req.body)
    const { _id, ...rest} =req.body
    console.log(rest)
    const data = await productModel.updateOne({_id : _id},rest)
    res.send({ success: true, message : "data update successfully", data: data});
})

//delete api 
//http://localhost:4000/delete/id
app.delete("/delete-product/:id",async(req,res)=>{
    const id = req.params.id
    console.log(id)
    const data = await productModel.deleteOne({_id :id})
    res.send({ success: true, message : "data delete successfully", data: data}); 
})

mongoose.connect("mongodb://127.0.0.1:27017/onestop") 
.then(()=>{
    console.log("connect to DB ")
    app.listen(4000, () => console.log("Server is running on port 4000"));
})

.catch((err)=>console.log(err))



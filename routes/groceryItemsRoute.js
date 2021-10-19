const express = require('express');
const router = express.Router();
const groceryItemsModel = require('../models/groceryItemsModel');

router.post('/add',async function(request,response){
    try{
        const additionResponse = await groceryItemsModel.create(request.body);
        console.log('additionResponse',additionResponse);
        response.send({result:'item added successfully'});
    }catch(err){
        console.log('error occured in adding item',err);
    }
});
router.get('/list',async function (request, response) {
    try{
        const groceryList= await groceryItemsModel.find({},{__v:0});
        response.send({result:groceryList});
    }catch(err){
        console.log('error occured in listing item',err);
    }
});
router.put('/update', async function (request, response){
    try{
        const groceryItemsRecord = await groceryItemsModel.findOne({
            '_id':request.body._id
        });
        groceryItemsRecord.isPurchased = true;
        await groceryItemsRecord.save();
        console.log('groceryItemsRecord', groceryItemsRecord);
        response.send({result:'item updated successfully'});
    }catch(err){
        console.log('error occured while updating item', err);
    }
});

router.delete('/delete', async function (request, response){
    try{
        await groceryItemsModel.deleteOne({_id:request.body._id});
        response.send({ result:'Item deleted successfully'});
    }catch(err){
        console.log('error occured while deleting item', err);
    }
});
module.exports=router;
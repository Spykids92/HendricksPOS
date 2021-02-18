const mongoose = require('mongoose');
const Menu = mongoose.model('menus');


const orderSchema = new mongoose.Schema({
   items:[
     {item:{
         menu_id:mongoose.Schema.Types.ObjectId,
         name:String,
         price:mongoose.Decimal128},
      qty:Number,
      subTotalPrice:mongoose.Decimal128
    }
 ],
  totalPrice:mongoose.Decimal128
})

mongoose.model('orders', orderSchema, 'Order');

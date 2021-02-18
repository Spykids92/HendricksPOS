const mongoose = require('mongoose');
const Order = mongoose.model('orders');

module.exports =(app)=>{
  app.get('/api/orders', async (req,res) => {
    let orders = await Order.find();
    return res.status(200).send(orders);
  });


  app.post('/api/order', async (req,res) => {
    let order = Order.create(req.body);
    console.log(res);
    return res.status(201).send({
      error: false,
      order
    })
  });


  app.put(`/api/order/:id`, async (req, res) => {
    const {id} = req.params;
    let order = await Order.findByIdAndUpdate(id, req.body);
    return res.status(202).send({
      error: false,
      order
    })
  });


  app.delete(`/api/order/:id`, async (req, res) => {
    const {id} = req.params;
    let order = await Order.findByIdAndDelete(id);
    return res.status(202).send({
      error: false,
      order
    })
  })
}

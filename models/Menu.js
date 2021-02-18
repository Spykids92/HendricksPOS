const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: String,
    price: mongoose.Decimal128,
});

mongoose.model('menus', menuSchema, 'Menu');

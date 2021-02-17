const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: String,
    price: String,
});

mongoose.model('menus', menuSchema, 'Menu');

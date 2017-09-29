const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Toy = new Schema({
    toy: {
        type: String
    },
}, {
    collection: 'toys'
});

module.exports = mongoose.model('toy', Toy);
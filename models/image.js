const mongoose = require('mongoose');
const Schema = monngoose.Schema;

var ImageSchema = new Schema({
    imageName: {
        type: String,
        default: 'none',
        required: true
    },
    imageData: {
        type:Styring,
        required: true
    }
});

var Image = mongoose.model('Image', ImageSchema);

module.export = Image;
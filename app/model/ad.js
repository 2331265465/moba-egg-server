'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const CategorySchema = new Schema({
    name: {type:String},
    body: {type:String},
    items: [{
      image: {type:String},
      url: {type:String}
    }]
  })
  return mongoose.model('Ad', CategorySchema,'ad');
}
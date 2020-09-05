'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const CategorySchema = new Schema({
    name: {type:String},
    parent: {type:mongoose.SchemaTypes.ObjectId,ref: 'Category'}
  })
  return mongoose.model('Category', CategorySchema,'category');
}
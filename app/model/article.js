'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const CategorySchema = new Schema({
    title: {type:String},
    categories: [{type:mongoose.SchemaTypes.ObjectId, ref:'Category'}],
    body: {type:String}
  })
  return mongoose.model('Article', CategorySchema,'article');
}
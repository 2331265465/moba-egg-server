'use strict';
const bcrypt = require('bcryptjs')
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const CategorySchema = new Schema({
    username: {type:String},
    password: {
      type:String,
      set(val) {
        return bcrypt.hashSync(val,10)
      },
      select:false
    }

  })
  return mongoose.model('AdminUser', CategorySchema,'adminUser');
}
'use strict';

const Controller = require('egg').Controller;
const inflection = require('inflection')
class AdminController extends Controller {
  modelName = inflection.classify(this.ctx.params.resource)
  //创建资源
  async categories() {
    const { ctx,modelName } = this;
        const res =  await ctx.model[modelName].create(ctx.request.body)
        ctx.body = {
          res,
          message:'保存成功'
        }
  }
  //资源列表
  async getCategories() {
    const { ctx,modelName } = this;
    const queryOptions = {}
    if (modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    ctx.body = await ctx.model[modelName].find().setOptions(queryOptions).limit(10)
  }
  //资源详情
  async getCategoriesId() {
    const { ctx,modelName } = this;
    ctx.body = await ctx.model[modelName].findById(ctx.params.id)
  }
  //更新资源
  async putCategories() {
    const { ctx,modelName } = this;
    ctx.body = await ctx.model[modelName].findByIdAndUpdate(ctx.params.id,ctx.request.body)
  }
  //删除资源
  async deleteCategories() {
    const { ctx,modelName } = this;
    await ctx.model[modelName].findByIdAndDelete(ctx.params.id)
    ctx.body = {success:true}
  }
}

module.exports = AdminController;

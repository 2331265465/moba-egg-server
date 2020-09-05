'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async login() {
    const { ctx,app } = this
    const { username,password }= ctx.request.body
    const message = '账号或密码错误'
    try {
      const user = await ctx.model.AdminUser.findOne({username}).select('+password')
      const isValid = require('bcryptjs').compareSync(password, user.password)
      //验证账号密码
      if (user && isValid) {
        // 验证token，请求时在header配置 Authorization=`Bearer ${token}`
        // 特别注意：token不能直接发送，要在前面加上Bearer字符串和一个空格
        const token = app.jwt.sign({id: user._id}, app.config.jwt.secret)
        ctx.body = {
          token
        }
      }else {
        const status = ctx.status = 422
        ctx.body ={
          status,
          message
        }
      }
    }catch {
      const status = ctx.status = 422
      ctx.body ={
        status,
        message
      }
    }
  }
}

module.exports = LoginController;
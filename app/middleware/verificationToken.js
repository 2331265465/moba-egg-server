'use scripts'
module.exports = options => {
  return async (ctx, next) => {
    let token
    let id
    await next()
    try {
      token = String(ctx.headers.authorization || '').split(' ').pop()
      id = {id} = ctx.app.jwt.verify(token,ctx.app.config.secret)
      ctx.user = await ctx.model.AdminUser.findById(id)
    }catch {
      if (!token && !ctx.user && !id) {
        ctx.status = 401
        ctx.body = {
          message:'请先登录！'
        }
      }
    }
  }
};
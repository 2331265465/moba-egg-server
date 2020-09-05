'use strict';

//node.js 文件操作对象
const fs = require('fs');
//node.js 路径操作对象
const path = require('path');
//egg.js Controller
const Controller = require('egg').Controller;
//故名思意 异步二进制 写入流
const awaitWriteStream = require('await-stream-ready').write;
//管道读入一个虫洞。
const sendToWormhole = require('stream-wormhole');

class UploaderController extends Controller {

  async index() {
    const { ctx,config } = this;
    const stream = await ctx.getFileStream();
    //新建一个文件名
    const filename = stream.filename.toLocaleLowerCase();
    const localhost = ctx.request.header.host
    //文件生成绝对路径
    //判断一下是否存在文件路径
    const target = path.join(config.baseDir, 'app/public/upload', filename);

    //生成一个文件写入 文件流
    const writeStream = fs.createWriteStream(target);
    try {
      //异步把文件流 写入
      await awaitWriteStream(stream.pipe(writeStream));

    } catch (err) {
      //如果出现错误，关闭管道
      await sendToWormhole(stream);
      throw err;
    }
    //文件响应
    ctx.body = {
      url:  `http://${localhost}/public/upload/${filename}`,
      status:200
    };
  }
}

module.exports = UploaderController;
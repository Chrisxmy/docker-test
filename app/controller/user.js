
const { Controller }= require('egg');

class UserController extends Controller {

  async findAllUser() {
    const { ctx, app } = this;
    ctx.body = await ctx.model.User.findAll();
  }

  async sign() {
    const ctx = this.ctx;
    const { username, password } = ctx.request.body;

    const user = await ctx.service.user.sign(username, password);
    ctx.body = user;
  }

  async loginWithUnPa(){
      const ctx = this.ctx;
      const { username, password } = ctx.request.body;
      const user = await ctx.service.user.loginWithUnPa(username, password);

      ctx.session.user = user.id;

      ctx.body = {
        code:0,
        data: user,
      }
  }

  async test(){
    const ctx = this.ctx;
    ctx.body = 0
  }


}

module.exports = UserController;

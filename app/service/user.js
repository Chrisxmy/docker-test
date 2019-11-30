const { Service } = require('egg');

class UserService extends Service {
    async sign(username, password){
      const user = await this.ctx.model.User.sign(username, password);
      return user
    }

    async loginWithUnPa(username, password){
        const user = await this.ctx.model.User.loginWithUnPa(username, password);
        return user
    }

    async test(){
        return {name: '123'}
    }
}

module.exports = UserService;
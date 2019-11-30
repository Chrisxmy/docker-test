const Subscription = require('egg').Subscription;
var i = 0;
class WatchFile extends Subscription {
  static get schedule() {
    return {
      cron: '0 51 20 * * *',
      type: 'all',
    };
  }
  async subscribe() {
    var result  = await this.ctx.service.user.test();
    console.log(result)
  }
}

module.exports = WatchFile;
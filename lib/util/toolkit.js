class Toolkit {
  /**
   * Get the client IP from current request object
   * @param {Object} req Request param
   * @return {String} Extracted IP from request
   */
  static getIp(req) {
    let ipAddr = req.headers['x-forwarded-for'];
    if (ipAddr) {
      const list = ipAddr.split(',');
      ipAddr = list[list.length - 1];
    } else {
      ipAddr = req.headers['cf-connecting-ip'];
      if (ipAddr) {
        const list = ipAddr.split(',');
        ipAddr = list[list.length - 1];
      } else {
        ipAddr = req.connection.remoteAddress;
      }
    }
    return ipAddr;
  }
}

module.exports = Toolkit;

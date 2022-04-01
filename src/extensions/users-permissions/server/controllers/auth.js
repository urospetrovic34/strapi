module.exports = {
  async refreshToken(ctx) {
    // Refresh token
    ctx.send({
      refreshed: true,
    })
  },
  async revoke(ctx) {
    // Refresh token
    ctx.send({
      revoked: true,
    })
  },
};
module.exports = (plugin) => {
  const sanitizeOutput = (user) => {
    const {
      password,
      resetPasswordToken,
      confirmationToken,
      ...sanitizedUser
    } = user; // be careful, you need to omit other private attributes yourself
    return sanitizedUser;
  };

  plugin.controllers.user.me = async (ctx) => {
    if (!ctx.state.user) {
      return ctx.unauthorized();
    }
    const user = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
      ctx.state.user.id,
      { populate: ["role","avatar"] }
    );

    ctx.body = sanitizeOutput(user);
  };

  plugin.controllers.user.find = async (ctx) => {
    console.log(ctx.query.filters);
    const users = await strapi.entityService.findMany(
      "plugin::users-permissions.user",
      {
        filters: ctx.query.filters,
        populate: ctx.query.populate,
        sort: ctx.query.sort,
        start: ctx.query.start,
        limit: ctx.query.limit,
      }
    );
    ctx.body = users.map((user) => sanitizeOutput(user));
  };
  plugin.controllers.user.findOne = async (ctx) => {
    if (!ctx.state.user) {
      return ctx.unauthorized();
    }
    const user = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
      ctx.params[0].split("/")[2],
      { populate: ctx.query.populate }
    );

    ctx.body = sanitizeOutput(user);
  };
  plugin.controllers.auth["refreshToken"] = async (ctx) => {
    const { token } = ctx.request.body;
    const payload =
      strapi.plugins["users-permissions"].services.jwt.verify(token);
    return strapi.plugins["users-permissions"].services.jwt.issue({
      id: payload.id,
    });
  };
  //comment
  //comment2
  plugin.routes["content-api"].routes.push({
    method: "POST",
    path: "/auth/refreshToken",
    handler: "auth.refreshToken",
    config: {
      prefix: "",
    },
  });
  return plugin;
};

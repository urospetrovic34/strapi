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
  
    const prepareFilter = (params) => {
      let query = "";
      for (let p in params) {
        query +=
          encodeURIComponent(p) +
          ":" +
          String(encodeURIComponent(params[p])) +
          ",";
      }
      return query.slice(0, -1);
    };
  
    plugin.controllers.user.me = async (ctx) => {
      if (!ctx.state.user) {
        return ctx.unauthorized();
      }
      const user = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        ctx.state.user.id,
        { populate: ["role"] }
      );
  
      ctx.body = sanitizeOutput(user);
    };
  
    plugin.controllers.user.find = async (ctx) => {
      console.log(ctx.params);
      // const users = await strapi.db.query('plugin::users-permissions.user').findMany(ctx.query,'role')
      const users = await strapi.services.user.find(ctx.query);
      ctx.body = users.map((user) => sanitizeOutput(user));
    };
  
    plugin.controllers.user.findOne = async (ctx) => {
      if (!ctx.state.user) {
        return ctx.unauthorized();
      }
      const user = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        ctx.state.user.id,
        { populate: ["role"] }
      );
  
      ctx.body = sanitizeOutput(user);
    };
  
    return plugin;
  };
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
  
    const prepareFilter = (params) => {
      let query = "";
      for (let p in params) {
        query +=
          encodeURIComponent(p) +
          ":" +
          String(encodeURIComponent(params[p])) +
          ",";
      }
      return query.slice(0, -1);
    };
  
    plugin.controllers.user.me = async (ctx) => {
      if (!ctx.state.user) {
        return ctx.unauthorized();
      }
      const user = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        ctx.state.user.id,
        { populate: ["role"] }
      );
  
      ctx.body = sanitizeOutput(user);
    };
  
    plugin.controllers.user.find = async (ctx) => {
      // const users = await strapi.db.query('plugin::users-permissions.user').findMany(ctx.query,'role')
      const users = await strapi.entityService.findMany(
        "plugin::users-permissions.user",
        {
          filters: ctx.query && ctx.query,
          populate: { role: true },
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
        ctx.params[0].split('/')[2],
        { populate: ["role"] }
      );
  
      ctx.body = sanitizeOutput(user);
    };
  
    return plugin;
  };
  
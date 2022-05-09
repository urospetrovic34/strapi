"use strict";

/**
 *  project controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::project.project", ({ strapi }) => ({
  async find(ctx) {
    const { meta } = await super.find(ctx);
    const projects = await strapi.entityService.findMany(
      "api::project.project",
      {
        filters: ctx.query.filters,
        populate: ctx.query.populate,
        sort: ctx.query.sort,
        start: meta.pagination.page,
        limit: meta.pagination.pageSize,
      }
    );
    ctx.body = { projects, meta };
  },
}));

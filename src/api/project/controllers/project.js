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
        start: (meta.pagination.page - 1) * 9,
        limit: meta.pagination.pageSize,
      }
    );
    ctx.body = { projects, meta };
  },
  async findOne(ctx) {
    console.log(ctx.query.populate);
    const data = await strapi.entityService.findOne(
      "api::project.project",
      ctx.url.split("/")[3],
      {
        populate: {
            logo:true,
            employees:{
                populate:["avatar","role"]
            },
            notes:{
                populate:["category","files","project"]
            }
        },
      }
    );
    ctx.body = { data };
  },
}));

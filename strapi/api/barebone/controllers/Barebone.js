'use strict';

/**
 * Barebone.js controller
 *
 * @description: A set of functions called "actions" for managing `Barebone`.
 */

module.exports = {

  /**
   * Retrieve barebone records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.barebone.search(ctx.query);
    } else {
      return strapi.services.barebone.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a barebone record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.barebone.fetch(ctx.params);
  },

  /**
   * Count barebone records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.barebone.count(ctx.query);
  },

  /**
   * Create a/an barebone record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.barebone.add(ctx.request.body);
  },

  /**
   * Update a/an barebone record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.barebone.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an barebone record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.barebone.remove(ctx.params);
  }
};

'use strict';

/**
 * Variants.js controller
 *
 * @description: A set of functions called "actions" for managing `Variants`.
 */

module.exports = {

  /**
   * Retrieve variants records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.variants.search(ctx.query);
    } else {
      return strapi.services.variants.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a variants record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.variants.fetch(ctx.params);
  },

  /**
   * Count variants records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.variants.count(ctx.query);
  },

  /**
   * Create a/an variants record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.variants.add(ctx.request.body);
  },

  /**
   * Update a/an variants record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.variants.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an variants record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.variants.remove(ctx.params);
  }
};

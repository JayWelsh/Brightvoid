'use strict';

/**
 * Imagecollection.js controller
 *
 * @description: A set of functions called "actions" for managing `Imagecollection`.
 */

module.exports = {

  /**
   * Retrieve imagecollection records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.imagecollection.search(ctx.query);
    } else {
      return strapi.services.imagecollection.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a imagecollection record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.imagecollection.fetch(ctx.params);
  },

  /**
   * Count imagecollection records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.imagecollection.count(ctx.query);
  },

  /**
   * Create a/an imagecollection record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.imagecollection.add(ctx.request.body);
  },

  /**
   * Update a/an imagecollection record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.imagecollection.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an imagecollection record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.imagecollection.remove(ctx.params);
  }
};

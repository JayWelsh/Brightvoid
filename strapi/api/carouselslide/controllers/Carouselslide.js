'use strict';

/**
 * Carouselslide.js controller
 *
 * @description: A set of functions called "actions" for managing `Carouselslide`.
 */

module.exports = {

  /**
   * Retrieve carouselslide records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.carouselslide.search(ctx.query);
    } else {
      return strapi.services.carouselslide.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a carouselslide record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.carouselslide.fetch(ctx.params);
  },

  /**
   * Count carouselslide records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.carouselslide.count(ctx.query);
  },

  /**
   * Create a/an carouselslide record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.carouselslide.add(ctx.request.body);
  },

  /**
   * Update a/an carouselslide record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.carouselslide.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an carouselslide record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.carouselslide.remove(ctx.params);
  }
};

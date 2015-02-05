Factory.controller('<%= componentName %>', ['$', function($) {
  'use strict';

  //shared variables


  /**
   * @param {Element} el
   * @constructor
   */
  var <%= controllerName %> = function (el) {
    this.el = el;

  };

  <%= controllerName %>.prototype = {

  };

  return <%= controllerName %>;
}]);

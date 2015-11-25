Validator.Errors = (function () {
  'use strict';

  function Errors() {
    this.messages = {};
  }

  Errors.prototype.length = 0;

  Errors.prototype.add = function (attribute, message) {
    if (!this.messages[attribute]) {
      this.messages[attribute] = [];
      this.length += 1;
    }

    this.messages[attribute].push(message);
  };

  Errors.prototype.isEmpty = function () {
    return this.length === 0;
  };

  Errors.prototype.all = function () {
    return this.messages;
  };

  Errors.prototype.on = function(attribute) {
    return this.messages[attribute] || [];
  };

  Errors.prototype.clean = function () {
    this.messages = {};
    this.length = 0;
  };

  return Errors;
})();
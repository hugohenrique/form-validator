Validator.InlineErrorRenderer = (function () {
  'use strict';

  function InlineErrorRenderer() {
    
  }

  InlineErrorRenderer.prototype.render = function(validator) {
    var errors = validator.errors.all();

    for (var name in errors) {
      this.renderError(validator, name, errors[name]);
    }
  };

  InlineErrorRenderer.prototype.clean = function(validator) {
    validator.form.find(".error").remove();
  };

  // Private
  InlineErrorRenderer.prototype.renderError = function(validator, name, errors) {
    var error = $("<span>").addClass("error").text(errors[0]);

    validator.form.find("[name='" + name + "']").after(error);
  };

  return InlineErrorRenderer;
})();

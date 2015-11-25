Validator.ContainerRenderer = (function () {
  function ContainerRenderer() {

  }

  ContainerRenderer.prototype.render = function(validator) {
    var errors = validator.errors.all();

    for (var name in errors) {
      validator.form.find('input[name="' + name + '"]').parent().addClass('with-error');
    }
  };

  ContainerRenderer.prototype.clean = function(validator) {
    validator.form.find('.with-error').removeClass('with-error');
  };

  return ContainerRenderer;
})();
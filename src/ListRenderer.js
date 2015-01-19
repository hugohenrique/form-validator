Validator.ListRenderer = (function () {
  function ListRenderer(banner) {
    this.banner = banner;
  }

  ListRenderer.prototype.render = function (validator) {
    var container = $('<div class="error-messages">');
    this.renderBanner(container);
    this.renderList(container, validator.errors.all());

    validator.form.prepend(container);
  };

  ListRenderer.prototype.clean = function (validator) {
    validator.form.find('.error-messages').remove();
  };

  ListRenderer.prototype.renderBanner = function (container) {
    $('<p>').text(this.banner).appendTo(container);
  };

  ListRenderer.prototype.renderList = function (container, errors) {
    var list = $("<ul>").appendTo(container);

    for (var name in errors) {
      errors[name].forEach(
        function (error) {
          $("<li>").text(error).appendTo(list);
        }
      );
    }
  };

  return ListRenderer;
})();
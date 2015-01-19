Validator.Form = (function(){
  var caller = function(functionName, context, args) {
    return function(item) {
      return item[functionName].apply(context || item, args);
    };
  };

  function Form(form, renderers) {
    this.form = form;
    this.renderers = renderers || [];
    this.validator = new Validator();
    this.errors = this.validator.errors;
  }

  Form.prototype.validate = function(type, field, options) {
    this.validator.validate(
      type,
      this.form.find(field).attr('name'),
      options
    );
  };

  Form.prototype.clean = function() {
    this.renderers.map(caller('clean', null, [this]));
  };

  Form.prototype.render = function() {
    this.renderers.map(caller('render', null, [this]));
  };

  Form.prototype.isValid = function() {
    var record = this.record();
    var result = this.validator.isValid(record);

    this.clean();

    if (!result) {
      this.render();
    }

    return result;
  };

  Form.prototype.record = function() {
    var formData = this.form.serializeArray();

    return formData.reduce(
      function (record, field) {
        record[field.name] = field.value;

        return record;
      },
      {}
    );
  };

  return Form;
})();
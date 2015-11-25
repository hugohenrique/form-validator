Validator.addConstraint = function(name, defaultMessage, condition) {
  var constructorName = Validator.getConstraintName(name);

  var constructor = Validator[constructorName] = function(record, attribute, options) {
    this.record = record;
    this.attribute = attribute;
    this.options = options;
    this.defaultMessage = defaultMessage;
  };

  constructor.prototype.errorMessage = function() {
    return this.options.message || this.defaultMessage;
  };

  constructor.prototype.isValid = condition;
};
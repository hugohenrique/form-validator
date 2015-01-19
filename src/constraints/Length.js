Validator.addConstraint(
  'length',
  null,
  function() {
    var length = (this.record[this.attribute] || '').length;
    var success = true;
    var errorMessage;
    var customMessage = this.options.message || {};

    this.defaultMessage = {
      min: "can't have less than " + this.options.min + " characters",
      max: "can't have more than " + this.options.max + " characters"
    };

    if (this.options.min && length < this.options.min) {
      success = false;
      errorMessage = customMessage.min || this.defaultMessage.min;
    } else if (this.options.max && length > this.options.max) {
      success = false;
      errorMessage = customMessage.max || this.defaultMessage.max;
    }

    this.errorMessage = function() {
      return errorMessage;
    };

    return success;
  }
);
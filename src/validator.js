var Validator = (function () {
  'use strict';

  var toUpperCase = function (match, letter) {
    return letter.toUpperCase();
  };

  function Validator() {
    this.constraints = [];
    this.errors = new Validator.Errors();
  }

  Validator.getConstraintName = function (name) {
    var constructorName = name.replace(/[-_](.)/g, toUpperCase)
                              .replace(/^(.)/, toUpperCase);

    return constructorName + 'Constraint';
  };

  Validator.getConstructorFromName = function(name) {
    return Validator[Validator.getConstraintName(name)];
  };

  Validator.prototype.validate = function(type, attribute, options) {
    this.constraints.push({
      type      : type,
      attribute : attribute,
      options   : options || {}
    });
  };

  Validator.prototype.isValid = function(record) {
    this.errors.clean();

    this.constraints.forEach(
      function(constraint) {
        // Retrieve the validator constructor based on the `type` option.
        var constructor = Validator.getConstructorFromName(constraint.type);

        var validator = new constructor(
          record,
          constraint.attribute,
          constraint.options
        );

        if (!validator.isValid()) {
          this.errors.add(
            constraint.attribute,
            validator.errorMessage()
          );
        }
      },
      this
    );

    // To be considered as valid, the errors object must
    // have no messages.
    return this.errors.isEmpty();
  };

  return Validator;
})();
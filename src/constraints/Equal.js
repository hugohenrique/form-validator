Validator.addConstraint(
  'equal',
  'must be equal',
  function () {
    var confirmationAttribute = this.attribute + "_equal";
    var value = this.record[this.attribute] || '';

    return value == this.record[confirmationAttribute] || '';
  }
);
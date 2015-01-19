Validator.addConstraint(
  'format',
  'is an invalid format',
  function () {
    var value = this.record[this.attribute] || '';

    return !!value.match(this.options.format);
  }
);
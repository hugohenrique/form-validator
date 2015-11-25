Validator.addConstraint(
  'format',
  'is an invalid format',
  function () {
    if (this.options.format === undefined) {
      throw new Error('You should inform a valid regex');
    }

    var value = this.record[this.attribute] || '';

    return !!value.match(this.options.format);
  }
);
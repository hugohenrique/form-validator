Validator.addConstraint(
  'equal',
  'Should be equal to the confirmation',
  function () {
    var value = this.record[this.attribute] || '';
    var equal = this.options['equal'] !== undefined
      ? this.options['equal']
      : this.record[this.attribute + '_equal'];

    return value == equal || '';
  }
);
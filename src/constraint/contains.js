Validator.addConstraint(
  'contains',
  'The value not be found',
  function () {
    var value = this.record[this.attribute];
    var values = this.options['values'];

    if (Object.prototype.toString.call(value) === '[object Array]') {
      return values.indexOf(value) !== -1;
    }

    if (typeof value !== 'string' || !value instanceof String) {
      return false;
    }

    value = this.options['identical'] ? value : value.toLowerCase();

    return values.indexOf(value) !== -1;
  }
);
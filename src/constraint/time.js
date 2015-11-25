Validator.addConstraint(
  'time',
  'Please enter a valid time, between 00:00 and 23:59',
  function () {
    var value = this.record[this.attribute];

    return /^([01]\d|2[0-3])(:[0-5]\d){1,2}$/.test(value);
  }
);

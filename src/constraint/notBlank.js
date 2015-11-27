Validator.addConstraint(
  'notBlank',
  'Should not be blank',
  function () {
    var value = this.record[this.attribute];

    return !!value && String(value).replace(/\s/mg, '');
  }
);

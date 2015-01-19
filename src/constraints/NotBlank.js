Validator.addConstraint(
  'notBlank',
  'cant be blank',
  function () {
    var value = this.record[this.attribute];

    return !!value && !!value.replace(/\s/mg, '');
  }
);
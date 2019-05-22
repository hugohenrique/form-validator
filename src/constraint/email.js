Validator.addConstraint(
  'email',
  'Isn\'t a valid email address',
  function () {
    var value = this.record[this.attribute] || '';
    return !!value.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
  }
);
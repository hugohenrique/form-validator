Validator.addConstraint(
  'email',
  'is an email invalid',
  function () {
    var value = this.record[this.attribute] || '';

    return !!value.match(/^[a-z0-9]+([._][a-z0-9]+)*(\+[a-z0-9_-]+)?@[a-z0-9]+([.-][a-z0-9]+)*\.[a-z]{2,4}$/i);
  }
);
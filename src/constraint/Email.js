Validator.addConstraint(
  'email',
  'Isn\'t a valid email address',
  function () {
    var value = this.record[this.attribute] || '';

    return !!value.match(/^[a-z0-9]+([._][a-z0-9]+)*(\+[a-z0-9_-]+)?@[a-z0-9]+([.-][a-z0-9]+)*\.[a-z]{2,4}$/i);
  }
);
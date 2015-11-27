Validator.addConstraint(
  'callback',
  'Callback invalid',
  function () {
    var value = this.record[this.attribute];

    return this.options.callback.call(this, value);
  }
);

Validator.addConstraint(
  'notEqualTo',
  'This value should not be equal to "%s"',
  function () {
    var value = this.record[this.attribute];
    var message = this.defaultMessage;

    if (this.options.message) {
      message = this.options.message;
    }

    this.options.message = message.replace('%s', this.options.compare);

    return value && value != this.options.compare;
  }
);

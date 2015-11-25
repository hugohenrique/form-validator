Validator.addConstraint(
  'Date',
  'Please enter a valid date',
  function () {
    var value = this.record[this.attribute];
    var formats = {
      'YYYY-MM-DD' : /\d{4}-\d{2}-\d{2}/,
      'DD-MM-YYYY' : /\d{2}-\d{2}-\d{4}/,
      'DD/MM/YYYY' : /\d{2}\/\d{2}\/\d{4}/,
      'YY-MM-DD'   : /\d{2}-\d{2}-\d{2}/,
      'DD-MM-YY'   : /\d{2}-\d{2}-\d{2}/,
      'YY/MM/DD'   : /\d{2}\/\d{2}\/\d{2}/,
      'DD/MM/YY'   : /\d{2}\/\d{2}\/\d{2}/
    };

    var format = formats['YYYY-MM-DD'];

    if (this.options.format) {
      format = formats[this.options.format];
    }

		return format.test(value);
  }
);


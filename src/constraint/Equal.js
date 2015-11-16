Validator.addConstraint(
  'equal',
	'Should be equal to the confirmation',
	function () {
		var value = this.record[this.attribute] || '';
		var equal = this.record[this.attribute + '_equal'] || '';

		if (this.options.equal) {
			equal = this.record[this.options.equal];
		}

		return value == equal;
	}
);

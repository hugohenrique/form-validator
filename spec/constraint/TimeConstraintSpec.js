describe('Validator.TimeConstraint', function() {
  var validator, record, options;

  beforeEach(function () {
    record = {};
    options = {attribute: 'time'};
    validator = new Validator.TimeConstraint(record, 'time', options);
  });

  it('return the default error message', function () {
    validator.isValid();

    expect(validator.errorMessage()).toEqual('Please enter a valid time, between 00:00 and 23:59');
  });

  it('reject incorrect time format', function () {
		record.time = '0:00';

    expect(validator.isValid()).toBeFalsy();
  });

  it('accept correct time format', function () {
		record.time = '00:00';

    expect(validator.isValid()).toBeTruthy();
	});
});
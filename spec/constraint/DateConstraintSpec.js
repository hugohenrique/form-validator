describe('Validator.DateConstraint', function () {
  var validator, record, options;

  beforeEach(function () {
    record = {};
    options = {attribute: 'date'};
    validator = new Validator.DateConstraint(record, 'date', options);
  });

  it('return the default error message', function () {
    validator.isValid();

    expect(validator.errorMessage()).toEqual('Please enter a valid date');
  });

  it('reject incorrect date format', function () {
		record.date = '10102000';

    expect(validator.isValid()).toBeFalsy();
  });

  it('accept correct date format with default format', function () {
		record.date = '2010-10-10';

    expect(validator.isValid()).toBeTruthy();
	});

  it('accept correct date brazilian format', function () {
    record.date = '10-10-2000';
    options.format = 'DD-MM-YYYY';

    expect(validator.isValid()).toBeTruthy();
  });

  it('accept correct date brazilian formatted with backslash', function () {
    record.date = '10/10/2000';
    options.format = 'DD/MM/YYYY';

    expect(validator.isValid()).toBeTruthy();
  });

  it('accept correct short date format', function () {
    record.date = '00-10-10';
    options.format = 'YY-MM-DD';

    expect(validator.isValid()).toBeTruthy();
  });

  it('accept correct short date formatted with backslash', function () {
    record.date = '00/10/10';
    options.format = 'YY/MM/DD';

    expect(validator.isValid()).toBeTruthy();
  });

  it('accept correct short brazilian date', function () {
    record.date = '10/10/10';
    options.format = 'DD/MM/YY';

    expect(validator.isValid()).toBeTruthy();
  });
});

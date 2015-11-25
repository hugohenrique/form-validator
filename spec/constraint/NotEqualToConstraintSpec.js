describe('Validator.NotEqualToConstraint', function () {
  var validator, record, options;

  beforeEach(function () {
    record = {};
    options = {attribute: 'name', compare: '0123456789'};
    validator = new Validator.NotEqualToConstraint(record, 'name', options);
  });

  it('return default error message', function () {
    record.name = '0123456789';

    validator.isValid();

    expect(validator.errorMessage()).toEqual('This value should not be equal to "' + options.compare + '"');
  });

  it('allow customize the error message', function () {
    record.name = 'notShouldEqual';
    options.message = 'Value are not equals with "%s"';

    validator.isValid();

    expect(validator.errorMessage()).toEqual('Value are not equals with "' + options.compare + '"');
  });

  it('accept values when they\'re not identical', function () {
    record.name = 'lorem ipsum';

    expect(validator.isValid()).toBeTruthy();
  });

  it('reject values when they\'re identical', function () {
    record.name = '0123456789';

    expect(validator.isValid()).toBeFalsy();
  });
});

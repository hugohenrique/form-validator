describe('Validator.EqualConstraint', function() {
  var validator, record, options;

  beforeEach(function() {
    record = {};
    options = {attribute: 'password'};
    validator = new Validator.EqualConstraint(record, 'password', options);
  });

  it('should return the default error message', function() {
    expect(validator.isValid()).toBeFalsy();
    expect(validator.errorMessage()).toEqual('Should be equal to the confirmation');
  });

  it('should return custom error message', function() {
    options.message = 'custom';

    expect(validator.isValid()).toBeFalsy();
    expect(validator.errorMessage()).toEqual('custom');
  });

  it('should reject different values', function() {
    record.password = 'test';
    record.password_equal = 'invalid';

    expect(validator.isValid()).toBeFalsy();
  });

  it('should accept equal values', function() {
    record.password = 'test';
    record.password_equal = 'test';

    expect(validator.isValid()).toBeTruthy();
  });

  it('isValid should return true when options "equal" is equal', function () {
    validator = new Validator.EqualConstraint({ value: 'abcdef' }, 'value', { equal: 'abcdef' });

    expect(validator.isValid()).toBeTruthy();
  });
});
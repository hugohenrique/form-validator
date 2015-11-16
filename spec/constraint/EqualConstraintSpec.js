describe('Validator.EqualConstraint', function() {
  var validator, record, options;

  beforeEach(function() {
    record = {email: ''};
    options = {equal: 'email_equal'};
    validator = new Validator.EqualConstraint(record, 'email', options);
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
    record.email = 'test';
    record.email_equal = 'invalid';

    expect(validator.isValid()).toBeFalsy();
  });

  it('should accept equal values', function() {
    record.email = 'test';
    record.email_equal = 'test';

    expect(validator.isValid()).toBeTruthy();
  });

  it('isValid should return true when options "equal" is equal', function () {
    validator = new Validator.EqualConstraint({ email: 'abcdef', email_equal: 'abcdef' }, 'email', { equal: 'email_equal' });

    expect(validator.isValid()).toBeTruthy();
  });
});
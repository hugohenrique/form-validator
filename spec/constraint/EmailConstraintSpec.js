describe('Validator.EmailConstraint', function() {
  var validator, record, options;

  beforeEach(function() {
    record = {};
    options = { attribute: 'email' };
    validator = new Validator.EmailConstraint(record, 'email', options);
  });

  it('should return the default error message', function() {
    expect(validator.isValid()).toBeFalsy();
    expect(validator.errorMessage()).toEqual('Isn\'t a valid email address');
  });

  it('should return custom error message', function() {
    options.message = 'custom';

    expect(validator.isValid()).toBeFalsy();
    expect(validator.errorMessage()).toEqual('custom');
  });

  it('should reject when email address is invalid format', function() {
    record.email = 'test@test';

    expect(validator.isValid()).toBeFalsy();
  });

  it('should accept when format is valid', function() {
    record.email = 'test@domain.com';

    expect(validator.isValid()).toBeTruthy();
  });
});
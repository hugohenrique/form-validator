describe('Validator.LengthConstraint', function() {
  var validator, record, options;

  beforeEach(function() {
    record = {};
    options = { attribute: 'password', min: 2, max: 4 };
    validator = new Validator.LengthConstraint(record, 'password', options);
  });

  it('should return the default error message for min', function() {
    validator.isValid();

    expect(validator.errorMessage()).toEqual('can\'t have less than 2 characters');
  });

  it('should return the default error message for max', function() {
    record.password = '12345';
    validator.isValid();

    expect(validator.isValid()).toBeFalsy();
    expect(validator.errorMessage()).toEqual('can\'t have more than 4 characters');
  });

  it('should return custom error message for min', function() {
    options.message = {min: 'between 2 and 4 characters'};
    validator.isValid();

    expect(validator.isValid()).toBeFalsy();
    expect(validator.errorMessage()).toEqual('between 2 and 4 characters');
  });

  it('should return custom error message for max', function() {
    options.message = {max: 'between 2 and 4 characters'};
    record.password = '12345';
    validator.isValid();

    expect(validator.isValid()).toBeFalsy();
    expect(validator.errorMessage()).toEqual('between 2 and 4 characters');
  });

  it('accepts minimum length', function() {
    record.password = '12';

    expect(validator.isValid()).toBeTruthy();
  });

  it('should accept maximum length', function() {
    record.password = '1234';

    expect(validator.isValid()).toBeTruthy();
  });

  it('should accept within range', function() {
    record.password = '123';

    expect(validator.isValid()).toBeTruthy();
  });
});
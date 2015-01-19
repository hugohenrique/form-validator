describe('Validator.NotBlankConstraint', function(){
  var validator, record, options;

  beforeEach(function(){
    record = {};
    options = {attribute: 'name'};
    validator = new Validator.NotBlankConstraint(record, 'name', options);
  });

  it('should return the default error message', function() {
    validator.isValid();

    expect(validator.errorMessage()).toEqual('Should not be blank');
  });

  it('should return custom error message', function() {
    options.message = 'custom';
    validator.isValid();

    expect(validator.errorMessage()).toEqual('custom');
  });

  it('should reject empty strings', function() {
    record.name = '';

    expect(validator.isValid()).toBeFalsy();
  });

  it('should reject undefined', function() {
    record.name = undefined;

    expect(validator.isValid()).toBeFalsy();
  });

  it('should reject whitespaces', function() {
    record.name = '\n\n\n    \t\t    ';

    expect(validator.isValid()).toBeFalsy();
  });

  it('should accept text', function() {
    record.name = 'John Doe';

    expect(validator.isValid()).toBeTruthy();
  });
});
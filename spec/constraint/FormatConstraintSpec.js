describe('Validator.FormatConstraint', function() {
  'use strict';

  var validator, record, options;

  beforeEach(function() {
    record = {};
    options = { attribute: 'username', format: /^[a-z0-9_-]+$/i };
    validator = new Validator.FormatConstraint(record, 'username', options);
  });

  it('should return the default error message', function() {
    validator.isValid();

    expect(validator.errorMessage()).toEqual('is an invalid format');
  });

  it('should return custom error message', function() {
    options.message = 'custom';
    validator.isValid();

    expect(validator.errorMessage()).toEqual('custom');
  });

  it('should reject invalid format', function() {
    record.username = 'this is invalid';

    expect(validator.isValid()).toBeFalsy();
  });

  it('should accept valid format', function() {
    record.username = 'johndoe';

    expect(validator.isValid()).toBeTruthy();
  });

  it('should raise exception when "format" is not defined', function () {
    new Validator.FormatConstraint(record, 'username', { attribute: 'username' });

    expect(function () { throw new Error('You should inform a valid regex'); }).toThrow();
  });

});
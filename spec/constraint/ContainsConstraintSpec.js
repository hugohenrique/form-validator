describe('Validator.ContainsConstraint', function() {
  var validator, record, options;

  beforeEach(function() {
    record = {};

    options = {
      attribute : 'field',
      values    : ['foo', 'bar', 'baz'],
      identical : false
    };

    validator = new Validator.ContainsConstraint(record, 'field', options);
  });

  it('should return the default error message', function() {
    record.field = '';

    expect(validator.isValid()).toBeFalsy();
    expect(validator.errorMessage()).toEqual('The value not be found');
  });

  it('should return custom error message', function() {
    options.message = 'custom';
    record.field = '';

    expect(validator.isValid()).toBeFalsy();
    expect(validator.errorMessage()).toEqual('custom');
  });

  it('should reject when a string not contains', function() {
    options.values = 'biz';
    record.field = 'bot';

    expect(validator.isValid()).toBeFalsy();
  });

  it('should reject when a string contain but not a identical', function () {
    options.values = 'bar';
    options.identical = true;
    record.field = 'BAR';

    expect(validator.isValid()).toBeFalsy();
  });

  it('should reject when not contains on list', function () {
    options.values = ['foo', 'bar', 'baz'];
    record.field = 'end';

    expect(validator.isValid()).toBeFalsy();
  });

  it('should reject when contains on list but not a identical', function () {
    options.values = ['foo', 'bar', 'baz'];
    options.identical = true;
    record.field = 'FOO';

    expect(validator.isValid()).toBeFalsy();
  });

  it('should accept when a string contains', function() {
    options.values = 'bar';
    record.field = 'bar';

    expect(validator.isValid()).toBeTruthy();
  });

  it('should accept when a string contains on list', function() {
    options.values = ['foo', 'bar', 1];
    record.field = 'bar';

    expect(validator.isValid()).toBeTruthy();
  });
});
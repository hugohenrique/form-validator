describe('Validator.CallbackConstraint', function () {
  var validator, record, options;

  beforeEach(function () {
    record = {};
    options = {attribute: 'time'};

    validator = new Validator.CallbackConstraint(record, 'time', options);
  });

  it('should return boolean', function () {
    record.time = '00:00';

    options.callback = function (value) {
      expect(value).toBeDefined();
      return true;
    };

    expect(validator.isValid()).toBeTruthy();
    expect(options.callback).toBeTruthy();
  });
});


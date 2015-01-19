describe('Validator', function () {
  describe('when record is valid', function () {
    var record, validator;

    beforeEach(function () {
      record = { name: 'Jonh Doe' };

      validator = new Validator();
      validator.validate('notBlank', 'name', { message: 'Name is required' });
    });

    it('returns true', function () {
      expect(validator.isValid(record)).toBeTruthy();
    });

    it('error messages is empty', function () {
      validator.isValid(record);

      expect(validator.errors.isEmpty()).toBeTruthy();
      expect(validator.errors.length).toEqual(0);
    });
  });

  describe('when record is invalid', function(){
    var validator, record;

    beforeEach(function() {
      record = { name: 'John Doe', email: null };
      validator = new Validator();
      validator.validate('notBlank', 'name', {message: 'Name is required'});
      validator.validate('notBlank', 'email', {message: 'E-mail is required'});
    });

    it('returns false', function() {
      expect(validator.isValid(record)).toBeFalsy();
    });

    it('has error messages', function() {
      validator.isValid(record);

      expect(validator.errors.length).toEqual(1);
    });
  });
});
describe('Validator.Form', function () {
  var form, input, validator;

  beforeEach(function() {
    form = $('<form/>');
    input = $('<input name="name">').appendTo(form);

    validator = new Validator.Form(form);
    validator.validate('notBlank', ':text', { message: 'is required' });
  });

  it('isn\'t valid', function(){
    expect(validator.isValid()).toBeFalsy();
  });

  it('is valid', function(){
    input.val('John Doe');

    expect(validator.isValid()).toBeTruthy();
  });

  describe('when there is multiple fields with equals name', function () {
    beforeEach(function () {
      form = $('<form/>');
      validator = new Validator.Form(form);
    });

    it('format singular name', function () {
      $('<input name="name" value="input-1">').appendTo(form);
      $('<input name="name" value="input-2">').appendTo(form);

      expect(validator.record()).toEqual({name: ['input-1', 'input-2']});
    });

    it('format array name', function () {
      $('<input name="name[]" value="input-1">').appendTo(form);
      $('<input name="name[]" value="input-2">').appendTo(form);

      expect(validator.record()).toEqual({'name[]': ['input-1', 'input-2']});
    });
  });
});

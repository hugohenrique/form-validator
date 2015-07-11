describe('Validator.Form', function() {
  var form, input, validator;

  beforeEach(function() {
    form = $('<form/>');
    input = $('<input name="name"/>').appendTo(form);

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

    beforeEach(function() {
      form = $('<form/>');
      var input1 = $('<input name="name" value="input1" />').appendTo(form);
      var input2 = $('<input name="name" value="input2" />').appendTo(form);

      validator = new Validator.Form(form);
    });

    it('Validator.record', function () {
      expect(validator.record()).toEqual({ name: ['input1', 'input2'] });
    });
  });
});
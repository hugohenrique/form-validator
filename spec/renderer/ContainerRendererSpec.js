describe('Validator.ContainerRenderer', function() {
  var form, input, validator, parent;

  beforeEach(function() {
    form = $('<form/>');
    parent = $('<p/>');
    input = $('<input name="name"/>').appendTo(parent);
    parent.appendTo(form);

    validator = new Validator.Form(form, [new Validator.ContainerRenderer()]);
    validator.validate('notBlank', ':text', { message: 'Name is required' });
  });

  it('should add class "with-error" when exists error', function() {
    expect(validator.isValid()).toBeFalsy();
    expect(input.parent().hasClass('with-error')).toBeTruthy();
  });

  it('should remove class "with-error" when clean error messages', function() {
    validator.isValid();
    input.val('John Doe');

    expect(validator.isValid()).toBeTruthy();
    expect(input.parent().hasClass('with-error')).toBeFalsy();
  });
});
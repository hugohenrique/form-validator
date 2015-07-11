var Validator = (function () {
  'use strict';

  var toUpperCase = function (match, letter) {
    return letter.toUpperCase();
  };

  function Validator() {
    this.constraints = [];
    this.errors = new Validator.Errors();
  }

  Validator.getConstraintName = function (name) {
    var constructorName = name.replace(/[-_](.)/g, toUpperCase)
                              .replace(/^(.)/, toUpperCase);

    return constructorName + 'Constraint';
  };

  Validator.getConstructorFromName = function(name) {
    return Validator[Validator.getConstraintName(name)];
  };

  Validator.prototype.validate = function(type, attribute, options) {
    this.constraints.push({
      type      : type,
      attribute : attribute,
      options   : options || {}
    });
  };

  Validator.prototype.isValid = function(record) {
    this.errors.clean();

    this.constraints.forEach(
      function(constraint) {
        // Retrieve the validator constructor based on the `type` option.
        var constructor = Validator.getConstructorFromName(constraint.type);

        var validator = new constructor(
          record,
          constraint.attribute,
          constraint.options
        );

        if (!validator.isValid()) {
          this.errors.add(
            constraint.attribute,
            validator.errorMessage()
          );
        }
      },
      this
    );

    // To be considered as valid, the errors object must
    // have no messages.
    return this.errors.isEmpty();
  };

  return Validator;
})();
Validator.Errors = (function () {
  'use strict';

  function Errors() {
    this.messages = {};
  }

  Errors.prototype.length = 0;

  Errors.prototype.add = function (attribute, message) {
    if (!this.messages[attribute]) {
      this.messages[attribute] = [];
      this.length += 1;
    }

    this.messages[attribute].push(message);
  };

  Errors.prototype.isEmpty = function () {
    return this.length === 0;
  };

  Errors.prototype.all = function () {
    return this.messages;
  };

  Errors.prototype.on = function(attribute) {
    return this.messages[attribute] || [];
  };

  Errors.prototype.clean = function () {
    this.messages = {};
    this.length = 0;
  };

  return Errors;
})();
Validator.addConstraint = function(name, defaultMessage, condition) {
  var constructorName = Validator.getConstraintName(name);

  var constructor = Validator[constructorName] = function(record, attribute, options) {
    this.record = record;
    this.attribute = attribute;
    this.options = options;
    this.defaultMessage = defaultMessage;
  };

  constructor.prototype.errorMessage = function() {
    return this.options.message || this.defaultMessage;
  };

  constructor.prototype.isValid = condition;
};
Validator.Form = (function(){
  var caller = function(functionName, context, args) {
    return function(item) {
      return item[functionName].apply(context || item, args);
    };
  };

  function Form(form, renderers) {
    this.form = form;
    this.renderers = renderers || [];
    this.validator = new Validator();
    this.errors = this.validator.errors;
  }

  Form.prototype.validate = function(type, field, options) {
    this.validator.validate(
      type,
      this.form.find(field).attr('name'),
      options
    );
  };

  Form.prototype.clean = function() {
    this.renderers.map(caller('clean', null, [this]));
  };

  Form.prototype.render = function() {
    this.renderers.map(caller('render', null, [this]));
  };

  Form.prototype.isValid = function() {
    var record = this.record();
    var result = this.validator.isValid(record);

    this.clean();

    if (!result) {
      this.render();
    }

    return result;
  };

  Form.prototype.record = function() {
    var formData = this.form.serializeArray();

    return formData.reduce(
      function (record, field) {
        if (record[field.name]) {
          if (typeof record[field.name] === 'string') {
            record[field.name] = [record[field.name]];
          }

          record[field.name].push(field.value);

          return record;
        }

        record[field.name] = field.value;

        return record;
      },
      {}
    );
  };

  return Form;
})();
Validator.InlineErrorRenderer = (function () {
  'use strict';

  function InlineErrorRenderer() {
    
  }

  InlineErrorRenderer.prototype.render = function(validator) {
    var errors = validator.errors.all();

    for (var name in errors) {
      this.renderError(validator, name, errors[name]);
    }
  };

  InlineErrorRenderer.prototype.clean = function(validator) {
    validator.form.find(".error").remove();
  };

  InlineErrorRenderer.prototype.renderError = function(validator, name, errors) {
    var error = $("<span>").addClass("error").text(errors[0]);

    validator.form.find("[name='" + name + "']").after(error);
  };

  return InlineErrorRenderer;
})();

Validator.ListRenderer = (function () {
  function ListRenderer(banner) {
    this.banner = banner;
  }

  ListRenderer.prototype.render = function (validator) {
    var container = $('<div class="error-messages">');
    this.renderBanner(container);
    this.renderList(container, validator.errors.all());

    validator.form.prepend(container);
  };

  ListRenderer.prototype.clean = function (validator) {
    validator.form.find('.error-messages').remove();
  };

  ListRenderer.prototype.renderBanner = function (container) {
    $('<p>').text(this.banner).appendTo(container);
  };

  ListRenderer.prototype.renderList = function (container, errors) {
    var list = $("<ul>").appendTo(container);

    for (var name in errors) {
      errors[name].forEach(
        function (error) {
          $("<li>").text(error).appendTo(list);
        }
      );
    }
  };

  return ListRenderer;
})();
Validator.ContainerRenderer = (function () {
  function ContainerRenderer() {

  }

  ContainerRenderer.prototype.render = function(validator) {
    var errors = validator.errors.all();

    for (var name in errors) {
      validator.form.find('input[name="' + name + '"]').parent().addClass('with-error');
    }
  };

  ContainerRenderer.prototype.clean = function(validator) {
    validator.form.find('.with-error').removeClass('with-error');
  };

  return ContainerRenderer;
})();
Validator.addConstraint(
  'email',
  'Isn\'t a valid email address',
  function () {
    var value = this.record[this.attribute] || '';

    return !!value.match(/^[a-z0-9]+([._][a-z0-9]+)*(\+[a-z0-9_-]+)?@[a-z0-9]+([.-][a-z0-9]+)*\.[a-z]{2,4}$/i);
  }
);
Validator.addConstraint(
  'equal',
	'Should be equal to the confirmation',
	function () {
		var value = this.record[this.attribute] || '';
		var equal = this.record[this.attribute + '_equal'] || '';
		
		if (this.options.equal) {
			equal = this.record[this.options.equal];
		}
		
		return value == equal;
	}
);


Validator.addConstraint(
  'format',
  'is an invalid format',
  function () {
    if (this.options.format === undefined) {
      throw new Error('You should inform a valid regex');
    }

    var value = this.record[this.attribute] || '';

    return !!value.match(this.options.format);
  }
);
Validator.addConstraint(
  'length',
  null,
  function() {
    var length = (this.record[this.attribute] || '').length;
    var success = true;
    var errorMessage;
    var customMessage = this.options.message || {};

    this.defaultMessage = {
      min: "can't have less than " + this.options.min + " characters",
      max: "can't have more than " + this.options.max + " characters"
    };

    if (this.options.min && length < this.options.min) {
      success = false;
      errorMessage = customMessage.min || this.defaultMessage.min;
    } else if (this.options.max && length > this.options.max) {
      success = false;
      errorMessage = customMessage.max || this.defaultMessage.max;
    }

    this.errorMessage = function() {
      return errorMessage;
    };

    return success;
  }
);
Validator.addConstraint(
  'notBlank',
  'Should not be blank',
  function () {
    var value = this.record[this.attribute];

    return !!value && !!value.replace(/\s/mg, '');
  }
);
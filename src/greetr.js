(function(global, $) {
  // Returns a new Greetr object by calling another constructor function.
  // to allow user to create an object without explicitly using new.
  var Greetr = function(firstName, lastName, language) {
    return new Greetr.init(firstName, lastName, language);
  };

  //  Some private objects.
  var supportedLanguages = ['en', 'es'];
  var casualGreetings = {
    en: 'Hello',
    es: 'Hola'
  };
  var formalGreetings = {
    en: 'Greetings',
    es: 'Saludos'
  };
  var logMessages = {
    en: 'Logged in',
    es: 'Inicio de sesión'
  };

  // Set all the utility methods to be exposed on the Greetr's prototype property.
  Greetr.prototype = {
    // Return the user's fullname.
    fullName: function() {
      return this.firstName + ' ' + this.lastName;
    },
    // Vaidate the language set.
    validate: function() {
      if (supportedLanguages.indexOf(this.language) === -1) {
        throw 'Invalid language';
      }
    },
    // Return casual greeting.
    casualGreet: function() {
      return casualGreetings[this.language] + ', ' + this.firstName + '!';
    },
    // Return formal greeting.
    formalGreet: function() {
      return formalGreetings[this.language] + ', ' + this.fullName();
    },
    // Greet user on the console.
    // parameter:- formal (boolean): if true then greet user formally.
    greet: function(formal) {
      var message;
      if (formal) {
        message = this.formalGreet();
      } else {
        message = this.casualGreet();
      }
      if (console) {
        console.log(message);
      }

      // to facilitate for function chaining.
      return this;
    },
    // Log message to console.
    log: function() {
      if (console) {
        console.log(logMessages[this.language] + ': ' + this.fullName());
      }

      return this;
    },
    // Set the language of a user.
    // parameter:- language (string): the user language.
    setLang: function(language) {
      this.language = language;
      this.validate();
      return this;
    },
    // Set the greeting on HTML element.
    // parameter:- selector (string): the JQuery selector.
    // parameter:- formal (boolean): if true then greet user formally.
    HTMLGreeting: function(selector, formal) {
      if (!$) {
        throw 'JQuery not loaded';
      }

      if (!selector) {
        throw 'Missing JQuery selector';
      }

      var message;
      if (formal) {
        message = this.formalGreet();
      } else {
        message = this.casualGreet();
      }

      $(selector).html(message);

      return this;
    }
  };

  // Actual constructor function
  Greetr.init = function(firstName, lastName, language) {
    var self = this;
    self.firstName = firstName || '';
    self.lastName = lastName || '';
    self.language = language || 'en';

    self.validate();
  };

  // All the Greetr objects are actually created by the Greeter.init function.
  // Set the prototype of these objects to the Greetr.prototype property.
  Greetr.init.prototype = Greetr.prototype;

  // Expose Greetr and G$ on the global scope.
  global.Greetr = global.G$ = Greetr;
})(window, jQuery);

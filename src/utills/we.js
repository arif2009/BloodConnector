module.exports = {
    version: '3.0',
    twoLetterYear: new Date().getFullYear().toString().substr(-2),
    apiOrigin: 'http://www.bloodconnector.org/', //'http://10.0.2.2/'
    appLink: 'https://play.google.com/store/apps/details?id=com.bloodconnector',
    reqMsg: 'Required',
    makeFirstCharecterLower: string => string.charAt(0).toLowerCase() + string.slice(1),
    maxLength: max => value => value && value.length > max ? `Must be ${max} characters or less` : undefined,
    minValue: min => value => value && value.length < min ? `Must be at least ${min} characters` : undefined,
    processModelstateError: function(modelErr){

      var errors = {};
      try {
        var validationErr = modelErr.response.data.modelState;
        for (var key in validationErr) {
          var field = key.split('.')[1];
          var error = validationErr[key][0];
          errors[field] = error;
        } 
      } catch (e) {
        //console.log('Exception Occered');
      }

      return errors;
    }
  };
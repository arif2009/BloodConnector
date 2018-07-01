module.exports = {
    version: '2.5.1',
    twoLetterYear: new Date().getFullYear().toString().substr(-2),
    apiOrigin: 'http://www.bloodconnector.org/', //'http://10.0.2.2/'
    makeFirstCharecterLower: string => string.charAt(0).toLowerCase() + string.slice(1),
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
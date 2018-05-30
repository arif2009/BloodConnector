const we = {
    version: '2.5.0',
    twoLetterYear: new Date().getFullYear().toString().substr(-2),
    apiOrigin: 'http://10.0.2.2/', //'http://www.bloodconnector.org/'
    processModelstateError: function(modelstate){
      var errors = [];
      for (var key in modelstate) {
          for (var i = 0; i < modelstate[key].length; i++) {
              errors.push(modelstate[key][i]);
          }
      }
      return errors;
    }
  }
  
  export default we;
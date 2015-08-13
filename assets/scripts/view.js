var View = (function(){
  ////////// HANDLEBARS //////////////
  //// Custom View Helper
  Handlebars.registerHelper('formatDate', function (text){
    if (moment) {
      return moment(text).tz('Iceland').format('dddd, MMMM Do YYYY, h:mm a');
    }
    else {
      return text;
    }
  });

  //// Top-Level Handlebars Template
  var _eventIndex = Handlebars.compile($("#event-template").html());


  return {
    eventIndexHTML : _eventIndex
  }
})();

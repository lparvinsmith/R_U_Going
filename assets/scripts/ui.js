'use strict';

$(document).ready(function(){

  //handlebars templating function
  var eventIndexTemplateFunction = Handlebars.compile($("#event-index").html());

  //call templating function with object events as parameter
  var newHTML = eventIndexTemplateFunction({events: data});

  //set element event-index's HTML to newHTML
  $("#event-index").html(newHTML);

});


var View = (function(){

  // //handlebars templating function
  // var eventIndexTemplateFunction = Handlebars.compile($("#event-index-template").html());



  return {
    // showEvents : function(){
    //   //call templating function with object events as parameter
    //   var newHTML = eventIndexTemplateFunction({events: data}); //how do I make this the event data from db??

    //   //set element event-index to newHTML
    //   $("#events").html(newHTML);
    // }
  }
})();

var eventFormTemplate = Handlebars.compile($("#event-form-partial").html());
Handlebars.registerPartial('eventForm', eventFormTemplate);






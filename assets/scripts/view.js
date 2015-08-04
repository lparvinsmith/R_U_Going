var View = (function(){
  var data = [
    {occurs_on: "2015-08-11", title:"RLLY COOL EVENT GUYS", venue:"some dev shop", description:"you'll like it tho", link:"heresalink", number_going:5},
    {occurs_on: "2015-08-12", title:"SRLSY COOL EVENT", venue:"some dev shop", description:"srsly tho the best event", link:"heresalink", number_going:7},
    {occurs_on: "2015-08-13", title:"LOTSA FREE SHIT", venue:"better dev shop", description:"like pizza n beer n tshirts n shit", link:"heresalink", number_going:17}
  ];

  //handlebars templating function
  var eventIndexTemplateFunction = Handlebars.compile($("#event-index-template").html());

  return {
    showEvents : function(){
      //call templating function with object events as parameter
      var newHTML = eventIndexTemplateFunction({events: data});

      //set element event-index to newHTML
      $("#events").html(newHTML);
    }
  }
})();







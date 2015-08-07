
var sa = 'http://localhost:3000';

//define function showEvents, to be called on document.ready.
var showEvents = function() {
  $.ajax(sa + '/events', {
    contentType: 'application/json',
    processData: false,
    dataType: 'json',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + simpleStorage.get("token")
    }
  }).done(function(data, textStatus, jqxhr){
    console.log(data);
      //sort by date from earliest to latest
      data.events.sort(function(first, second) {
        var firstEpoch = (new Date(first.occurs_at)).getTime(),
          secondEpoch = (new Date(second.occurs_at)).getTime();

        if(firstEpoch < secondEpoch) {
          return -1;
        } else if(firstEpoch > secondEpoch) {
          return 1;
        } else {
          return 0;
        }
      });

      //HANDLEBARS
      //helper for formatting date
      Handlebars.registerHelper('formatDate', function (text){
        if (moment) {
          return moment(text).tz('Iceland').format('dddd, MMMM Do YYYY, h:mm a');
        }
        else {
          return text;
        }

      });

      //handlebars templating function
      var eventIndexTemplateFunction = Handlebars.compile($("#event-template").html());
      //call templating function with object events as parameter
      var newHTML = eventIndexTemplateFunction({events: data.events});
      //set element event-index to newHTML
      $("#events").html(newHTML);

    console.log(JSON.stringify(data));
  }).fail(function(jqxhr, textStatus, errorThrown){
    console.log('index failed');
  });
};

//count user's events (thru confirmations) to be displayed via index.html
var yourEventCount = function(){
  $.ajax(sa + '/events/count', {
    contentType: 'application/json',
    processData: false,
    dataType: 'json',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + simpleStorage.get("token")
    }
  }).done(function(data, textStatus, jqxhr){
    console.log(data);
    $("#your-events").html(data);
  }).fail(function(jqxhr, textStatus, errorThrown){
    console.log('your event count failed');
  });
};

//shorthand for $document.ready
$(function(){
  'use strict';



// var MyApi = (function(){
//   return {
//     register: function(){
//       $.ajax(sa + '/register', {
//         contentType: 'application/json',
//         processData: false,
//         data: JSON.stringify({
//           credentials: {
//             email: $('#email').val(),
//             password: $('#password').val(),
//             // password_confirmation: $('#password').val()
//           }
//         }),
//         dataType: 'json',
//         method: 'POST'
//         //see api.jquery documentation online for meanings of all of these
//       }).done(function(data,textStatus,jqxhr){
//         console.log(JSON.stringify(data));
//       }).fail(function(jqxhr, textStatus, errorThrown){
//         console.log('registration failed');
//       })
//     },
//     login: function(){
//       $.ajax(sa + '/login', {
//         contentType: 'application/json',
//         processData: false,
//         data: JSON.stringify({
//           credentials: {
//             email: $("#email").val(),
//             password: $("#password").val()
//           }
//         }),
//         dataType: 'json',
//         method: 'POST'
//       }).done(function(data){
//         console.log(data.token);
//       }).fail(function(e){
//         console.log('login failed');
//       });
//     },
//     createEvent: function(){}
//   };
// })();

  //invoke showEvents
  showEvents();
  yourEventCount();

  //when click button 'register', register user
  $('#register').on('click', function(e){
    $.ajax(sa + '/register', {
      contentType: 'application/json',
      processData: false,
      data: JSON.stringify({
        credentials: {
          email: $('#email').val(),
          password: $('#password').val(),
          // password_confirmation: $('#password').val()
        }
      }),
      dataType: 'json',
      method: 'POST'
    }).done(function(data,textStatus,jqxhr){
      $("#authentication-success").html("Registration successful! Please log in.");
      console.log(JSON.stringify(data));
    }).fail(function(jqxhr, textStatus, errorThrown){
      $("#authentication-success").html("Registration failed! Please try again.");
      console.log('registration failed');
    })
  });

  //when click button 'login', login user
  $('#login').on('click', function(e){
    $.ajax(sa + '/login', {
      contentType: 'application/json',
      processData: false,
      data: JSON.stringify({
        credentials: {
          email: $("#email").val(),
          password: $("#password").val()
        }
      }),
      dataType: 'json',
      method: 'POST'
    }).done(function(data){
      console.log(data.token)
      //uses simpleStorage to store token
      simpleStorage.set("token", data.token);
      $("#authentication-success").html("Login successful.");
    }).fail(function(e){
      $("#authentication-success").html("Login failed! Please try again.");
      console.log('login failed');
    });
  });

  //when click button 'create-event', create new event
  //user who creates event is recorded as "going"?
  $('#create-event').on('click', function(e) {
    $.ajax(sa + '/events', {
      contentType: 'application/json',
      processData: false,
      data: JSON.stringify({
        event: {
          occurs_at: $("#create-event-date-time").val(),
          title: $("#create-event-title").val(),
          venue: $("#create-event-venue").val(),
          description: $("#create-event-description").val(),
          link: $("#create-event-link").val()
        }
      }),
      dataType: 'json',
      method: 'POST',
      headers: {
        Authorization: 'Token token=' + simpleStorage.get("token")
      }
    }).done(function(data, textStatus, jqxhr){
      console.log(JSON.stringify(data));
      // showEvents(); //why doesn't this work??
    }).fail(function(jqxhr, textStatus, errorThrown){
      console.log('create failed');
    });
  });

  //when click button 'update-event', update new event
  $('#update-event').on('click', function(e) {
    var id = $(this).data('id');
    // console.log(id);
    $.ajax(sa + '/events/' + id, {
      contentType: 'application/json',
      processData: false,
      data: JSON.stringify({
        event: {
          occurs_at: $("#update-event-date-time").val(),
          title: $("#update-event-title").val(),
          venue: $("#update-event-venue").val(),
          description: $("#update-event-description").val(),
          link: $("#update-event-link").val()
        }
      }),
      dataType: 'json',
      method: 'PATCH',
      headers: {
        Authorization: 'Token token=' + simpleStorage.get("token")
      }
    }).done(function(data, textStatus, jqxhr){
      console.log(JSON.stringify(data));
      //NEED to update elements of DOM to reflect changes
      //use jQuery to take event with this ID out of the DOM
      //and close modal
    }).fail(function(jqxhr, textStatus, errorThrown){
      console.log('update failed');
    });
  });


  //when click button 'event-destroy', delete event
  $("#events").on('click', '.event-destroy', function(){
    var id = $(this).data('id');
    $.ajax(sa + '/events/' + id, {
      method: 'DELETE',
      headers: {
        Authorization: 'Token token=' + simpleStorage.get("token")
      }
    }).done(function(data){
      console.log("Deleted event!");
      //NEED to update page to reflect changes
      //use jQuery to take event with this ID out of the DOM
    }).fail(function(data){
      console.error(data);
    });
  });


  //when click button 'im-going!', create confirmation
  $('#events').on('click', '.im-going', function(e) {
    var id = $(this).data('id');
    $.ajax(sa + '/confirmations', {
      contentType: 'application/json',
      processData: false,
      data: JSON.stringify({
        confirmation: {
          event_id: id
        }
      }),
      dataType: 'json',
      method: 'POST',
      headers: {
        Authorization: 'Token token=' + simpleStorage.get("token")
      }
    }).done(function(data, textStatus, jqxhr){
      console.log(JSON.stringify(data));
      //use serializer so you can see how many are going on each panel
      //create method confirmation_count = objects.confirmations.length

      // re-fetches the events (and re-renders?) to get new confirmation count
      showEvents();
      yourEventCount();

      // disable "I'm going" or switch it to "I'm not going"
    }).fail(function(jqxhr, textStatus, errorThrown){
      console.log('confirmation failed', jqxhr.responseText);

      // if for some reason the button fails to change or the user double-clicks the button, handle the validation error by displaying an error message to the user (not through the console)
    });
  });

});

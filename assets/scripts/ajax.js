
var sa = 'http://localhost:3000';

//when click button 'show-events', show event index

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

      //handlebars templating function
      var eventIndexTemplateFunction = Handlebars.compile($("#event-index-template").html());
      //call templating function with object events as parameter
      var newHTML = eventIndexTemplateFunction({events: data.events});

      //set element event-index to newHTML
      $("#events").html(newHTML);
    console.log(JSON.stringify(data));
  }).fail(function(jqxhr, textStatus, errorThrown){
    console.log('index failed');
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

//call showEvents
showEvents();

//when click button 'register', register user
//will this automatically add user to users table?
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
      console.log(JSON.stringify(data));
    }).fail(function(jqxhr, textStatus, errorThrown){
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
    }).fail(function(e){
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
          occurs_at: $("#event-date-time").val(),
          title: $("#event-title").val(),
          venue: $("#event-venue").val(),
          description: $("#event-description").val(),
          link: $("#event-link").val()
        }
      }),
      dataType: 'json',
      method: 'POST',
      headers: {
        Authorization: 'Token token=' + simpleStorage.get("token")
      }
    }).done(function(data, textStatus, jqxhr){
      console.log(JSON.stringify(data));
    }).fail(function(jqxhr, textStatus, errorThrown){
      console.log('create failed');
    });
  });

// //when click button 'show-events', show event index

//   $("#show-events").on('click', function(e) {
//     $.ajax(sa + '/events', {
//       contentType: 'application/json',
//       processData: false,
//       dataType: 'json',
//       method: 'GET',
//       headers: {
//         Authorization: 'Token token=' + simpleStorage.get("token")
//       }
//     }).done(function(data, textStatus, jqxhr){

//         //handlebars templating function
//         var eventIndexTemplateFunction = Handlebars.compile($("#event-index-template").html());
//         //call templating function with object events as parameter
//         var newHTML = eventIndexTemplateFunction({events: data.events});

//         //set element event-index to newHTML
//         $("#events").html(newHTML);
//       console.log(JSON.stringify(data));
//     }).fail(function(jqxhr, textStatus, errorThrown){
//       console.log('index failed');
//     });
//   });

//when click button 'update-event', update new event
  // $('.update-event').on('click', function(e) {
  //   var id = $(this).data.("id");
  //   $.ajax(sa + '/events/' + id, { //how to get id from panel?
  //     contentType: 'application/json',
  //     processData: false,
  //     data: JSON.stringify({
  //       event: {
  //         occurs_at: $("#event-date-time").val(),
  //         title: $("#event-title").val(),
  //         venue: $("#event-venue").val(),
  //         description: $("#event-description").val(),
  //         link: $("#event-link").val()
  //       }
  //     }),
  //     dataType: 'json',
  //     method: 'PATCH',
  //     headers: {
  //       Authorization: 'Token token=' + simpleStorage.get("token")
  //     }
  //   }).done(function(data, textStatus, jqxhr){
  //     console.log(JSON.stringify(data));
  //   }).fail(function(jqxhr, textStatus, errorThrown){
  //     console.log('update failed');
  //   });
  // });

//when click button 'delete-event', delete event

//when click button 'im-going!', add to user's id to event database


});

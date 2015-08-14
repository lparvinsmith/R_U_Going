
// var sa = 'http://localhost:3000';
var sa = "https://desolate-shelf-8612.herokuapp.com";


var MyApi = (function(){
  return {
    register: function(){
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
    },
    login: function(){
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
        location.reload();
        $("#authentication-success").html("Login successful.");
      }).fail(function(e){
        $("#authentication-success").html("Login failed! Please try again.");
        console.log('login failed');
      });
    },
    createEvent: function(){
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
        location.reload();
      }).fail(function(jqxhr, textStatus, errorThrown){
        console.log('create failed');
      });
    },
    showEvents: function(){
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

          $("#events").html(View.eventIndexHTML({events: data.events}));
          $('[data-toggle="popover"]').popover();

        console.log(JSON.stringify(data));
      }).fail(function(jqxhr, textStatus, errorThrown){
        console.log('index failed');
      });
    },
    yourEventCount: function(){
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
    }
  };
})();

//shorthand for $document.ready
$(function(){
  'use strict';


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
      location.reload();
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
      location.reload();
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
      location.reload();

      // disable "I'm going" or switch it to "I'm not going"
    }).fail(function(jqxhr, textStatus, errorThrown){
      console.log('confirmation failed', jqxhr.responseText);

      // if for some reason the button fails to change or the user double-clicks the button, handle the validation error by displaying an error message to the user (not through the console)
    });
  });

});

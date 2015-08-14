'use strict';

$(document).ready(function(){

  //AUTHENTICATION
  //on when click button register, registers user
  $('#register').on('click', function(e){
    MyApi.register();
  });

  //when click button 'login', login user
  $('#login').on('click', function(e){
    MyApi.login();
  });

  //click logout button flushes token from simpleStorage
  $("#logout").on('click', function(){
    simpleStorage.flush();
    location.reload();
    $("#authentication-success").html("You have logged out.");
  });

  //CREATE EVENT
  //when click button 'create-event', create new event
  $('#create-event').on('click', function(e){
    MyApi.createEvent();
  });

  //INDEX EVENT
  //when page loads, show events
  MyApi.showEvents();

  //when page loads, count user's events (thru confirmations)
  MyApi.yourEventCount();

  //UPDATE EVENT
  //when click button 'update-event', update new event

  //uses data from event --via update button-- to populate event update modal
  $('#eventUpdateModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var title = button.data('title');
    var occurs = button.data('occurs');
    var venue = button.data('venue');
    var description = button.data('description');
    var link = button.data('link');
    var id = button.data('id');

    var modal = $(this);
    modal.find('#update-event-date-time').val(occurs);
    modal.find('#update-event-title').val(title);
    modal.find('#update-event-venue').val(venue);
    modal.find('#update-event-description').val(description);
    modal.find('#update-event-link').val(link);
    modal.find('#update-event').data("id", id);
  });

  //DELETE EVENT
  //when click button 'event-destroy', delete event

  //CREATE CONFIRMATION
  //when click button 'im-going!', create confirmation

  //need to change button to 'not-going'

  //DELETE CONFIRMATION
  //when click button 'not-going', delete confirmation

});


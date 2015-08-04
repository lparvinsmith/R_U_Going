//wrapping in jQ function necessary?
$(function(){
  'use strict';

var sa = '//localhost:3000';

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
      //see api.jquery documentation online for meanings of all of these
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
      console.log(data.token);
    }).fail(function(e){
      console.log('login failed');
    });
  });

//when click button 'create-event', create new event
//user who creates event is recorded as "going"?
  $('#create').on('click', function(e) {
    $.ajax(sa + '/events', {
      contentType: 'application/json',
      processData: false,
      data: JSON.stringify({}),
      dataType: 'json',
      method: 'POST',
      headers: {
        Authorization: 'Token token=' + $('#token').val()
      }
    }).done(function(data, textStatus, jqxhr){
      console.log(JSON.stringify(data));
    }).fail(function(jqxhr, textStatus, errorThrown){
      console.log('create failed');
    });
  });

//THESE BUTTONS DON'T EXIST YET

//when click button 'update-event', update new event

//when click button 'delete-event', delete event

//when click button 'im-going!', add to user's id to event database


});

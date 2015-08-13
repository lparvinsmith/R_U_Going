'use strict';

$(document).ready(function(){

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

  //click logout button flushes token from simpleStorage
  $("#logout").on('click', function(){
    simpleStorage.flush();
    location.reload();
    $("#authentication-success").html("You have logged out.");
  });

  //initializes popovers

});


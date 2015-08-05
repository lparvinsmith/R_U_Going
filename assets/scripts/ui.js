'use strict';

$(document).ready(function(){

  $('#eventUpdateModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var title = button.data('title');
    var occurs = button.data('occurs');
    var venue = button.data('venue');
    var description = button.data('description');
    var link = button.data('link');
    var id = button.data('id');
    // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this);
    modal.find('#event-date-time').val(occurs);
    modal.find('#event-title').val(title);
    modal.find('#event-venue').val(venue);
    modal.find('#event-description').val(description);
    modal.find('#event-link').val(link);
    modal.find('#update-event').data("id", id);
  });

});


Template.discussionCard.events({
  "click #editDiscussion": function(event, template){
     event.preventDefault();
     Modal.show("editDiscussionModal", this);
  },
  "click #deleteDiscussion": function(event) {
    event.preventDefault();
    const data = {
      id: this._id
    }
    sweetAlert({
        type: 'warning',
        title: "Are you sure ?",
        cancelButtonText: TAPi18n.__("no_delete_hangout"),
        confirmButtonText: TAPi18n.__("yes_delete_hangout"),
        confirmButtonColor: "#d9534f",
        showCancelButton: true,
        closeOnConfirm: false,
      },
      function() {
        // disable confirm button to avoid double (or quick) clicking on confirm event
        swal.disableButtons();

        Meteor.call('discussions.remove', data, function(error, result) {
          if (result) {
            swal("Poof!", "Your Discussion has been successfully deleted!", "success");
          } else {
            swal("Oops something went wrong!", error.error + "\n Try again", "error");
          }
        });

      }); //sweetAlert
  },
  "click .upvote": function(event) {
    event.preventDefault();
    const data = {
      id: this._id
    }
    Meteor.call("discussions.upvote", data, function(error, result){
      if(error){
        Bert.alert( error.reason, 'danger', 'growl-top-right' );
      }
      if(result){
        Bert.alert( 'Voted', 'success', 'growl-top-right' );
      }
    });
  },
  "click .downvote": function(event) {
    event.preventDefault();
    const data = {
      id: this._id
    }

    Meteor.call("discussions.downvote", data, function(error, result){
      if(error){
        Bert.alert( error.reason, 'danger', 'growl-top-right' );
      }
      if(result){
        Bert.alert( 'Voted', 'success', 'growl-top-right' );
      }
    });
  },
});
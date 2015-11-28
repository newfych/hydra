Template.mainScreen.helpers({
    user_name: function() {
        var user = Meteor.user();
        return user.username;
    }
});

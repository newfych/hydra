Accounts.onLogin(function(user){
    var user = user.username;
    if (!Checks.findOne({username: user})) {
        Checks.insert({username: user, status: true});
        Screens.insert({
            username: user,
            screen_name: 'Main'
        });
        var screen_id = Screens.findOne({
            username: user,
            screen_name: 'Main'})._id;
        Controls.insert({
            username: user,
            screen: screen_id,
            control_name: 'button_1',
            control_type: 'button',
            text:'Jigurda',
            width: 3,
            height: 1,
            pos_x: 0,
            pos_y: 0
        });
    }
    if(Meteor.isServer) {
        Meteor.publish('Screens', function () {
            return Screens.find({username: user});
        });
        Meteor.publish('Controls', function () {
            return Controls.find({username: user});
        });
        console.log ('Collections PUBLISHED (onloginroutine)')
    }
    if(Meteor.isClient) {
        Meteor.subscribe('Screens');
        Meteor.subscribe('Controls');
    }
});
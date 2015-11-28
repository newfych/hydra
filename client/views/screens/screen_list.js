Template.screenList.helpers({
    screens: function() {
        return Screens.find();
    }
});
Template.screenList.events({
    'click .col-sm-4' : function(e){
        var s_name = e.currentTarget.id;
        var screen = Screens.findOne({screen_name: s_name});
        Router.go('screenPage', screen);
    }
});

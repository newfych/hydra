

Template.editScreensRightPanel.events({
    'click #create-screen-button' : function(e){
        hideDivs('#create-screen-div');
        $('#create-screen-input').focus();
    },
    'click #create-screen' : function(e) {
        var user = Meteor.user().username;
        var screen = $.trim($('#create-screen-input').val());

        if (validateName(screen)) {
            var screen_name = {
                username: user,
                screen_name: screen
            };
            Screens.insert(screen_name);
            $("#screens-list option")
                .prop('selected', false)
                .filter(function () {
                    return $(this).text() == screen;
                })
                .prop('selected', true);
            var current_screen_id = Screens.findOne({screen_name: screen})._id;
            var default_control = {
                username: user,
                screen: current_screen_id,
                control_name: 'button_1',
                control_type: 'button',
                text:'JIGURDA',
                width: 3,
                height: 1,
                pos_x: 0,
                pos_y: 0
            }
            Controls.insert(default_control)
            $('#create-screen-div').hide();
            $('#create-screen-input').val('');
            checkForMainScreen();
        }
    },
    'click #cancel-create-screen' : function(e){
        var current_screen = $('#screens-list').val();
        $("#create-screen-div").hide();
    },
    'click #rename-screen-button' : function(e){
        if (!$("#rename-screen-button").prop("disabled"))
        {
            hideDivs('#rename-screen-div');
            var current_screen = $('#screens-list').val();
            $('#rename-screen-input').val(current_screen);
            $('#rename-screen-input').focus();
        }
    },
    'click #rename-screen' : function(e) {
        var renamed_name = $.trim($('#rename-screen-input').val());
        if (validateName(renamed_name)) {
            var current_screen = $('#screens-list').val();
            var current_screen_id = Screens.findOne({screen_name: current_screen})._id;
            Screens.update(current_screen_id, {$set: {screen_name: renamed_name}});
            $('#rename-screen-div').hide();
            $("#screens-list option")
                .filter(function () {
                    return $(this).text() == renamed_name;
                })
                .prop('selected', true);
            checkForMainScreen();
        }
    },
    'click #cancel-rename-screen' : function(e){
        $("#rename-screen-div").hide();
    },
    'click #delete-screen-button' : function(e){
        if (!$("#delete-screen-button").prop("disabled")) {
            hideDivs('#delete-screen-div');
        }
    },
    'click #delete-screen' : function() {
        var current_screen = $('#screens-list').val();
        if (current_screen == 'Main') {
            alert('Main screen can not be deleted!')
        } else {
            var current_screen_id = Screens.findOne({screen_name: current_screen})._id;
            Screens.remove(current_screen_id);
            $('#delete-screen-div').hide();
            var current_screen = $('#screens-list').val();
            checkForMainScreen();
        }
    },
    'click #cancel-delete-screen' : function(e){
        $("#delete-screen-div").hide();
    },
    'click #edit-screen-button' : function(e){
        var current_screen = $('#screens-list').val();
        var screen = Screens.findOne({screen_name: current_screen});
        Router.go('editControls', screen);
    },
    'click #switch-screen-button' : function(e){
        var current_screen = $('#screens-list').val();
        var screen = Screens.findOne({screen_name: current_screen});
        Router.go('screenPage', screen);
    }
});

function hideDivs(except_div){
    var divs = ['#create-screen-div', '#rename-screen-div','#delete-screen-div'];
    for (var i in divs){
        //console.log (divs[i]);
        if (divs[i] == except_div) {
            $(divs[i]).toggle();
        } else {
            $(divs[i]).hide();
        }
    }
};

Template.editScreensRightPanel.events({
    'change #screens-list' : function(e){
        checkForMainScreen();
        $('#rename-screen-input').val($('#screens-list').val());
    }
});

Template.editScreensRightPanel.helpers({
    screens: function() {
        return Screens.find();
    },
    controls: function() {
        return Controls.find();
    },
    screen_name: function() {
        return $('#screens-list').val();
    }
});

function checkForMainScreen(){
    var current_screen = $('#screens-list').val();
    if (current_screen == 'Main') {
        $("#rename-screen-button").prop("disabled", true);
        $("#rename-screen-button").addClass('disabled');
        $("#delete-screen-button").prop("disabled", true);
        $("#delete-screen-button").addClass('disabled');
        hideDivs('');
    } else {
        $("#rename-screen-button").prop("disabled", false);
        $("#rename-screen-button").removeClass('disabled');
        $("#delete-screen-button").prop("disabled", false);
        $("#delete-screen-button").removeClass('disabled');
    }
}

function validateName(name){
    if ( name ==''){
        alert('Name is empty!')
        return false;
    } else {
        return true;
    }
}
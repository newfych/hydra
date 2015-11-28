Template.editControls.helpers({
    screens: function() {
        return Screens.find();
    },
    controls: function() {
        return Controls.find();
    },
    control_name: function() {
        return $('#controls-list').val();
    },
    current_screen:function(){
        return currentScreenName()
    }
});

function settingWorkSpace() {
    var workspace = $('#controls-workspace');
    var w = workspace.width();
    var h = w * 0.75;
    workspace.height(h);
    var p = workspace.position();
    var control_width = currentControl().width;
    $("#control-width option")
        .prop('selected', false)
        .filter(function () {
            return $(this).val() == control_width;
        })
        .prop('selected', true);
    var control_height = currentControl().height;
    $("#control-height option")
        .prop('selected', false)
        .filter(function () {
            return $(this).val() == control_height;
        })
        .prop('selected', true);
}

function fillControls(){
    var workspace = $('#controls-workspace');
    var step = (workspace.width() / 12);
    var p = workspace.position();
    var controls = Controls.find({screen: currentScreenId()});
    controls.forEach(function (control) {
        var w = control.width;
        var h = control.height;
        var x = control.pos_x;
        var y = control.pos_y;
        var text = control.text;
        var id = control._id;
        workspace.append('<div id="' + id + '">' + text + '</div>')
        var element = $('#' + id);
        element.width(w * step);
        element.height(h * step);
        var top_offset = y*step + p.top;
        var left_offset = x*step + p.left;
        element.css({position: "absolute", marginLeft: 0,
            marginTop: 0, top: top_offset, left: left_offset});
        element.css('backgroundColor', '#00FFA0');
    })
}

function currentControl(){
    var current_control = $('#controls-list').val();
    var b = Controls.findOne({screen: currentScreenId(), control_name: current_control});
    return b
}

function currentScreenName(){
    var d = Screens.findOne({_id: currentScreenId()}).screen_name;
    return d
}

function currentScreenId(){
    var a = Router.current().url;
    var b = a.split('/');
    var c = b[(b.length - 1)];
    return c
}

Template.editControls.rendered = (function() {
    settingWorkSpace();
    fillControls();
});
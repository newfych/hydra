Template.editControlsRightPanel.helpers({
    screens: function() {
        return Screens.find();
    },
    controls: function() {
        return Controls.find({screen: currentScreenId()});
    },
    control_name: function() {
        return $('#controls-list').val();
    }

});

Controls.find().observeChanges({
    added: function() {
        console.log('controls added');
    },
    changed: function() {
        console.log('controls changed');
        updateArrows();
        updateControl();
        updateFields();
    },
    removed: function() {
        console.log('controls removed');
    }
});

Template.editControlsRightPanel.events({
    'click #change-text-button' : function(){
        hideDivs('#change-text-div');
        $('#change-text-input').val(currentControl().text);
        $('#change-text-input').focus();
    },
    'click #change-text' : function() {
        var new_text = $.trim($('#change-text-input').val());
        if (validateName(new_text)) {
            Controls.update(currentControl()._id, {$set: {text: new_text}});
        }
        $('#change-text-div').hide();
    },
    'click #cancel-change-text' : function(){
        $("#change-text-div").hide();
    },
    'click #x-minus' : function(){
        var x = currentControl().pos_x;
        Controls.update(currentControl()._id, {$set: {pos_x: (x-1)}});
    },
    'click #x-plus' : function(){
        var x = currentControl().pos_x;
        Controls.update(currentControl()._id, {$set: {pos_x: (x+1)}});
    },
    'click #y-minus' : function(){
        var y = currentControl().pos_y;
        Controls.update(currentControl()._id, {$set: {pos_y: (y-1)}});
    },
    'click #y-plus' : function(){
        var y = currentControl().pos_y;
        Controls.update(currentControl()._id, {$set: {pos_y: (y+1)}});
    }

});

Template.editControlsRightPanel.events({
    'change #control-width' : function(e){
        var w = $('#control-width').val();
        Controls.update(currentControl()._id, {$set: {width: w}});
        //console.log(w);
    },
    'change #control-height' : function(e){
        var h = $('#control-height').val();
        Controls.update(currentControl()._id, {$set: {height: h}});
    }
});

function updateFields(){
    var w = currentControl().width;
    $("#control-width option")
        .prop('selected', false)
        .filter(function () {
            return $(this).val() == w;
        })
        .prop('selected', true);
    var h = currentControl().height;
    $("#control-height option")
        .prop('selected', false)
        .filter(function () {
            return $(this).val() == h;
        })
        .prop('selected', true);
}

function updateControl(){
    var workspace = $('#controls-workspace');
    var step = (workspace.width() / 12);
    var p = workspace.position();
    var control = currentControl();
    var w = control.width;
    var h = control.height;
    var x = control.pos_x;
    var y = control.pos_y;
    var text = control.text;
    var id = control._id;
    var element = $('#' + id);
    element.width(w * step);
    element.height(h * step);
    var top_offset = y*step + p.top;
    var left_offset = x*step + p.left;
    element.css({position: "absolute", marginLeft: 0,
        marginTop: 0, top: top_offset, left: left_offset});
    element.css('backgroundColor', '#00FFA0');
    element.text(text);
}

function hideDivs(except_div){
    var divs = ['#change-text-div'];
    for (var i in divs){
        console.log (divs[i]);
        if (divs[i] == except_div) {
            $(divs[i]).toggle();
        } else {
            $(divs[i]).hide();
        }
    }
};

function currentControl(){
    var current_control = $('#controls-list').val();
    var b = Controls.findOne({screen: currentScreenId(), control_name: current_control});
    return b
}

function currentScreenId(){
    var a = Router.current().url;
    var b = a.split('/');
    var c = b[(b.length - 1)];
    return c
}

function validateName(name){
    if ( name ==''){
        alert('Name is empty!')
        return false;
    } else {
    return true;
    }
}

function updateArrows(){
    var workspace = $('#controls-workspace');
    var step = (workspace.width() / 12);
    var p = workspace.position();
    var control = currentControl();
    var w = control.width;
    var h = control.height;
    var x = control.pos_x;
    var y = control.pos_y;
    var id = control._id;
    var element = $('#' + id);
    element.width(w * step);
    element.height(h * step);
    var top_offset = y*step + p.top;
    var left_offset = x*step + p.left;
    if (y <= 0 ){
        $("#y-minus").prop('disabled', true);
    }

    if (x <= 0 ){
        $("#x-minus").prop('disabled', true);
    }
    //element.css({position: "absolute", marginLeft: 0,
    //    marginTop: 0, top: top_offset, left: left_offset});
    //element.css('backgroundColor', '#00FFA0');
    //element.text(text);

}
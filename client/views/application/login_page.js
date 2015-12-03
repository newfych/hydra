Template.loginPage.rendered = function() {
    Session.set('loginState', 'login')
}
Template.loginPage.events({
    'click #register-button' : function(){
        console.log("Pressed left button");
        if (getLoginState() == 'login'){
            $('#forgot-password').hide();
            $('#confirm-div').show();
            $('#register-button-span').text('Login');
            $('#login-button').val('Register');
            Session.set('loginState', 'register')
        }
        else  if (getLoginState() == 'register'){
            $('#forgot-password').show();
            $('#confirm-div').hide();
            $('#register-button-span').text('Register');
            $('#login-button').val('Login');
            Session.set('loginState', 'login')
        }
    }
});

Template.loginPage.events({
    'submit #login-form' : function(e, t){
        e.preventDefault();
        console.log('Accept pressed');
        // retrieve the input field values
        var email = $.trim($('#login-email').val());
        var password = $.trim($('#login-password').val());
        if (email != ''){
            if (isEmail(email) != 0){
                $('#email-alert').text('* Email is incorrect')
            }
            else {
                $('#email-alert').text('Email is Ok')
            }
        }
        else {
            $('#email-alert').text('* Email is empty')
        }

        // Trim and validate your fields here....

        // If validation passes, supply the appropriate fields to the
        // Meteor.loginWithPassword() function.
        //Meteor.loginWithPassword(email, password, function(err){
        //    if (err){
        //
        //    }
        //    // The user might not have been found, or their passwword
        //    // could be incorrect. Inform the user that their
        //    // login attempt has failed.
        //    else{
        //
        //    }
        //    // The user has been logged in.
        //});
        return false;
    }
});

function getLoginState(){
    return Session.get('loginState');
}

function isEmail(email) {
    console.log(email);
    var pattern = /^[+a-z0-9_.-]+@[a-z0-9.-]+\.[a-z]{2,6}$/i;
    var s = email.search(pattern);
    return s;
}

function isValidString(str){
    var trimmed = $.trim(str);
    var cleaned = trimmed.replace(/[\|&;\$%"<>\(\)\+,]/g, "");
    if (cleaned != trimmed){
        return false;
    }
    else {
        return cleaned;
    }
}
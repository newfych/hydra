Template.loginForm.rendered = function() {
    Session.set('loginState', 'login');
}
Template.loginForm.events({
    'click #register-button' : function(){

        if (getLoginState() == 'login'){
            $('#forgot-password').hide();
            $('#discard-button').show();
            $('#confirm-div').show();
            $('#login-form-header').text('Register');
            $('#register-button-span').text('Back');
            $('#login-button').val('Register');
            Session.set('loginState', 'register')
        }
        else  if (getLoginState() == 'register'){
            $('#forgot-password').show();
            $('#discard-button').hide();
            $('#confirm-div').hide();
            $('#login-form-header').text('Login');
            $('#register-button-span').text('Register');
            $('#login-button').val('Login');
            Session.set('loginState', 'login')
        }
    }
});

Template.loginForm.events({
    'submit #login-form' : function(e, t){
        e.preventDefault();
        console.log('Accept pressed');
        // retrieve the input field values
        var email = $.trim($('#login-email').val());
        var password = $.trim($('#login-password').val());
        var valid_email =  isValidEmail(email);
        var valid_password = isValidString(password);
        if (getLoginState() == 'login') {
            if (valid_email && valid_password){
                console.log("Accept in login");
            }
        } else if (getLoginState() == 'register'){
            var confirm = $.trim($('#confirm-password').val());
            var valid_confirm = isValidConfirm(password, confirm);
            if (valid_email && valid_password && valid_confirm){
                console.log("Accept in register");
            }
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
    var pattern = /^[+a-z0-9_.-]+@[a-z0-9.-]+\.[a-z]{2,6}$/i;
    var s = email.search(pattern);
    return s;
}
function isValidEmail(email){
    if (email == ''){
        $('#email-alert').text('* Email is empty');
        return false
    } else if (isEmail(email) != 0){
        $('#email-alert').text('* Email is incorrect');
        return false
    } else {
        $('#email-alert').text('Email is Ok');
        return true
    }
}
function isValidString(str){
    var cleaned = str.replace(/[\|&;\$%@"<>\(\)\+,]/g, '');
    console.log('Pass ' + cleaned);
    if (cleaned == '') {
        $('#password-alert').text('* Password is empty');
        return false
    } else if (cleaned.length < 2) {
        $('#password-alert').text('* Password too short');
        return false
    } else if (cleaned != str) {
        $('#password-alert').text('* Password contains illegal symbols');
        return false
    } else {
        $('#password-alert').text('Password is Ok');
        return true
    }
}
function isValidConfirm(str1, str2){
    if (str2 == ''){
        $('#confirm-alert').text('* Confirmation is empty');
        return false
    } else if (str1 != str2){
        $('#confirm-alert').text('* Confirmation is wrong');
        return false
    }
    else {
        $('#confirm-alert').text('Confirmation is Ok');
        return true
    }
}

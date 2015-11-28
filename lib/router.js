Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});

Router.route('mainScreen', {path: '/'});
Router.route('createScreen', {path: '/create'});
Router.route('editScreen', {path: '/edit'});
Router.route('screenList', {path: '/screens-list'});

Router.route('/screens/:_id', {
    name: 'screenPage',
    waitOn: function() {
        return [
            Meteor.subscribe('Screens'),
            Meteor.subscribe('Controls')
        ];
    },
    data: function() { return Screens.findOne(this.params._id); }
});

Router.route('/editControls/:_id', {
    name: 'editControls',
    waitOn: function() {
        return [
            Meteor.subscribe('Screens'),
            Meteor.subscribe('Controls')
        ];
    },
    data: function() { return Screens.findOne(this.params._id); }
});

var requireLogin = function() {
    if (! Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('mainScreen');
        }
    } else {
        this.next();
    }
};

Router.onBeforeAction(requireLogin,
    {only:
        ['mainScreen', 'screenList', 'screenPage', 'editScreen', 'editControls']
    });
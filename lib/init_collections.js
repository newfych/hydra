Checks = new Mongo.Collection('checks');
Screens = new Mongo.Collection('screens');
Controls = new Mongo.Collection('controls');

Screens.allow({
    insert: function(userId, doc) {
        return !! userId;
    },
    update: function(userId, doc) {
        return !! userId;
    },
    remove: function(userId, doc) {
        return !! userId;
    }
});

Controls.allow({
    insert: function(userId, doc) {
        return !! userId;
    },
    update: function(userId, doc) {
        return !! userId;
    },
    remove: function(userId, doc) {
        return !! userId;
    }
});
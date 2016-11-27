Router.route('/',{
    waitOn: function () {
        return Meteor.subscribe('calories')
    },

    action: function() {
         this.render('home');
    }

});
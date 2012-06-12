// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
	'vm'
], function ($, _, Backbone, Vm) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      '/profile/:login_id': 'profile',
      '/users': 'users',
      '/feedback': 'feedback',
      '/artist': 'artist',
      '/truths': 'truths',
      '*actions': 'defaultAction' // All urls will trigger this route
    }
  });

  var initialize = function(options){
		var appView = options.appView;
    var router = new AppRouter(options);

		router.on('route:users', function (actions) {
			require(['views/users/page'], function (UsersPage) {
        var usersPage = Vm.create(appView, 'UsersPage', UsersPage);
        usersPage.render();
      });
		});
        router.on('route:truths', function (actions) {
      require(['views/truths/page'], function (TruthsPage) {
        var truthsPage = Vm.create(appView, 'TruthsPage', TruthsPage);
        truthsPage.render();
      });
    });
		router.on('route:profile', function (login_id) {
			require(['views/profile/page'], function (ProfilePage) {
        var profilePage = Vm.create(appView, 'ProfilePage', ProfilePage, {login_id: login_id});
        profilePage.render();
      });
		});
		router.on('route:feedback', function (actions) {
			require(['views/feedback/page'], function (FeedbackPage) {
        var feedbackPage = Vm.create(appView, 'FeedbackPage', FeedbackPage);
        feedbackPage.render();
      });
		});
		router.on('route:artist', function (actions) {
			require(['views/artist/page'], function (ArtistPage) {
        var artistPage = Vm.create(appView, 'ArtistPage', ArtistPage);
        artistPage.render();
      });
		});
    
		router.on('route:defaultAction', function (actions) {
			require(['views/example/page'], function (ExamplePage) {
        var examplePage = Vm.create(appView, 'ExamplePage', ExamplePage);
        examplePage.render();
      });
		});
    
    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});

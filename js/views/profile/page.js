define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'models/user',
  'text!templates/profile/layout.html'
], function($, _, Backbone, Session, UserModel, profileLayoutTemplate){
  var UsersPage = Backbone.View.extend({
    el: '.page',
    initialize: function () {
      var that = this;
      
    },
    render: function () {
      var that = this;
      this.$el.html(profileLayoutTemplate);
      var user = new UserModel({id: this.options.login_id});
      console.log(user);
      user.fetch({
        success: function () {
          console.log(arguments);
        }
        
      });
    }
  });
  return UsersPage;
});

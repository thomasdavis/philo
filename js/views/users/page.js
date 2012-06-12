define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'text!templates/users/layout.html',
  'collections/users'
], function($, _, Backbone, Session, usersLayoutTemplate, UsersCollection){
  var UsersPage = Backbone.View.extend({
    el: '.page',
    initialize: function () {
      var that = this;
      
    },
    render: function () {
      var that = this;
      this.$el.html(usersLayoutTemplate);
      var users = new UsersCollection();
      users.fetch({
        success: function (collection) {
          var listHTML = '';
          _.each(collection.models, function (user) {
            listHTML += '<li><a href="#/profile/' + user.get('login') + '">' + user.get('login') + '</a></li>';
          });
          that.$el.find('.user-list').html(listHTML);
        }
      });
    }
  });
  return UsersPage;
});

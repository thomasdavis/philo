define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'text!templates/artist/layout.html'
], function($, _, Backbone, Session, usersLayoutTemplate, UsersCollection){
  var ArtistPage = Backbone.View.extend({
    el: '.page',
    initialize: function () {
      var that = this;
      
    },
    render: function () {
      var that = this;
      this.$el.html(usersLayoutTemplate);

    }
  });
  return ArtistPage;
});

define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'text!templates/truths/page.html'
], function($, _, Backbone, Session, truthsTemplate){
  var ExamplePage = Backbone.View.extend({
    el: '.page',
    initialize: function () {
      var that = this;
      // Bind to the Session auth attribute so we
      // make our view act recordingly when auth changes
      Session.on('change:auth', function (session) {
          that.render();
      });
      Session.on('change:errors', function (errors) {
          that.render();
      });
    },
    render: function () {
      // Simply choose which template to choose depending on
      // our Session models auth attribute
      var that = this;
      var ba = Backbone.Model.extend({
        url: '/truths'
      });
      var b = new ba();
      b.fetch({success: function (model, models) {
       
        that.$el.html(_.template(truthsTemplate, {truths: models, _: _})); 
      }})
    }
  });
  return ExamplePage;
});

define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'text!templates/feedback/layout.html',
  'text!templates/feedback/list.html'
], function($, _, Backbone, Session, usersLayoutTemplate, feedbackTemplate){
  var FeedbackPage = Backbone.View.extend({
    el: '.page',
    initialize: function () {
      var that = this;
      
    },
    render: function () {
      var that = this;
      this.$el.html(usersLayoutTemplate);
      var FeedbackCollection = Backbone.Collection.extend({
        url: '/feedback'
      });;
      var feedback = new FeedbackCollection();
      feedback.fetch({
        success: function (collection) {
          console.log(collection);
          that.$el.find('.feedback-container').html(_.template(feedbackTemplate, {feedback:collection.models, _:_}));
        }
      });
    },
    events: {
      'submit .feedback-form': 'postFeedback'
    },
    postFeedback: function (ev) {
      var that = this;
      var userFeedback = $(ev.currentTarget).serializeObject();
      var FeedbackModel = Backbone.Model.extend({
        url: '/feedback'
      });
      var feedback = new FeedbackModel();
      feedback.save(userFeedback, {
        success: function () {
          that.render();
        }
      });
      return false;
    }
    
  });
  return FeedbackPage;
});

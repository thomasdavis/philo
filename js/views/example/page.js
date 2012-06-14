define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'text!templates/example/login.html',
  'text!templates/example/logout.html',
  'sigma'
], function($, _, Backbone, Session, exampleLoginTemplate, exampleLogoutTemplate, sigma){
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
      if(Session.get('auth')){
        this.$el.html(_.template(exampleLogoutTemplate, {username: Session.get('login')}));
      } else {
        this.$el.html(_.template(exampleLoginTemplate, {errors: Session.get('errors'), _: _})); 
      }
      var ba = Backbone.Model.extend({
        url: '/thought'
      });
      var b = new ba();
            $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
        options.xhrFields = {
          withCredentials: true
        };
          options.dataType = 'xml';
      });

  
      b.fetch({success: function (model, models) {
console.log(model);
 var sigInst = sigma.init(document.getElementById('sigma-example')).drawingProperties({
    defaultLabelColor: '#fff',
    defaultLabelSize: 14,
    defaultLabelBGColor: '#fff',
    defaultLabelHoverColor: '#000',
    labelThreshold: 6,
    defaultEdgeType: 'curve'
  }).graphProperties({
    minNodeSize: 1,
    maxNodeSize: 19,
    minEdgeSize: 1,
    maxEdgeSize: 1
  }).mouseProperties({
    maxRatio: 32
  });
sigInst.drawingProperties({
  defaultLabelColor: '#ccc',
  font: 'Arial',
  edgeColor: 'source',
  defaultEdgeType: 'curve'
}).graphProperties({
  minNodeSize: 1,
  maxNodeSize: 4
});
  // Parse a GEXF encoded file to fill the graph
  // (requires "sigma.parseGexf.js" to be included)
  console.log(model.get('xml'));
  sigInst.parseGexf(model.get('xml'));

  //highlights the nodes that is hovered+ its edges
  //
  // Bind events :
  var greyColor = '#666';
  sigInst.bind('overnodes',function(event){
    var nodes = event.content;
    var neighbors = {};
    sigInst.iterEdges(function(e){
      if(nodes.indexOf(e.source)<0 && nodes.indexOf(e.target)<0){
        if(!e.attr['grey']){
          e.attr['true_color'] = e.color;
          e.color = greyColor;
          e.attr['grey'] = 1;
        }
      }else{
        e.color = e.attr['grey'] ? e.attr['true_color'] : e.color;
        e.attr['grey'] = 0;

        neighbors[e.source] = 1;
        neighbors[e.target] = 1;
      }
    }).iterNodes(function(n){
      if(!neighbors[n.id]){
        if(!n.attr['grey']){
          n.attr['true_color'] = n.color;
          n.color = greyColor;
          n.attr['grey'] = 1;
        }
      }else{
        n.color = n.attr['grey'] ? n.attr['true_color'] : n.color;
        n.attr['grey'] = 0;
      }
    }).draw(2,2,2);
  }).bind('outnodes',function(){
    sigInst.iterEdges(function(e){
      e.color = e.attr['grey'] ? e.attr['true_color'] : e.color;
      e.attr['grey'] = 0;
    }).iterNodes(function(n){
      n.color = n.attr['grey'] ? n.attr['true_color'] : n.color;
      n.attr['grey'] = 0;
    }).draw(2,2,2);
  });
   sigInst.bind('overnodes',function(event){
    var nodes = event.content;
    var neighbors = {};
    sigInst.iterEdges(function(e){
      if(nodes.indexOf(e.source)>=0 || nodes.indexOf(e.target)>=0){
        neighbors[e.source] = 1;
        neighbors[e.target] = 1;
      }
    }).iterNodes(function(n){
      if(!neighbors[n.id]){
        n.hidden = 1;
      }else{
        n.hidden = 0;
      }
    }).draw(2,2,2);
  }).bind('outnodes',function(){
    sigInst.iterEdges(function(e){
      e.hidden = 0;
    }).iterNodes(function(n){
      n.hidden = 0;
    }).draw(2,2,2);
  });
   sigInst.activateFishEye();
  // Draw the graph :
  sigInst.draw();
      //  _.each(models, function (amodel) {
       //   $('.thoughts').append('<li>' + amodel.thought+ '</li>')
       // });
      }})
    },
    events: {
      'submit form.login': 'login', // On form submission
      'submit form.post-thought': 'postThought', // On form submission
      'click .logout': 'logout',
      'submit form.register': 'register'
    },
    postThought: function (ev) {

      var thought = $(ev.currentTarget).serializeObject();
      var ba = Backbone.Model.extend({
        url: '/thought'
      });
      var b = new ba();
      $('.thoughts').prepend('<li>' + thought.thought+ '</li>')
      b.save(thought, {
          success: function () {
            console.log(arguments);
          }
        }
      )
      return false;
    },
    login: function (ev) {
      // Disable the button
      $('[type=submit]', ev.currentTarget).val('Logging in').attr('disabled', 'disabled');
      // Serialize the form into an object using a jQuery plgin
      var creds = $(ev.currentTarget).serializeObject();
      Session.login(creds);
      return false;
    },
    logout: function (ev) {
      // Disable the button
      $(ev.currentTarget).text('Logging out').attr('disabled', 'disabled');
      Session.logout();
    },
    register: function (ev) {
       // Disable the button
      var that = this;
      $('[type=submit]', ev.currentTarget).val('Registering').attr('disabled', 'disabled');
      var UserModel = Backbone.Model.extend({
        url: '/user',
        idAttribute: "_id"  
      });
      var user = new UserModel;
      var creds = $(ev.currentTarget).serializeObject();
      user.save(creds, {
        success: function (data) {
          if(data.get('errors')) {
            alert(data.get('errors'));
            that.render();
          } else {
            Session.getAuth(function () {
              
            });
          }
        }
      });
      return false;     
    }
  });
  return ExamplePage;
});

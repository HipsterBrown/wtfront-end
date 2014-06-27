var Router = Ember.Router.extend({
  location: ENV.locationType
});

Router.map(function() {
  this.route('about');
  this.resource('stats');
  this.route('reference');
  this.route('new');
});

export default Router;

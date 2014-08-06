import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(val) {
  return new Ember.Handlebars.SafeString(window.markdown.toHTML(val));
});

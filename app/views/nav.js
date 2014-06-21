export default Ember.View.extend({
  templateName: 'nav',
  tagName: 'nav',
  isOpen: Ember.computed.alias('controller.isOpen'),
  classNameBindings: ['isOpen']
});

export default Ember.Controller.extend({
  isOpen: false,
  actions: {
    open: function() {
      var isOpen = this.get('isOpen');
      if (isOpen) {
        this.set('isOpen', false);
      } else {
        this.set('isOpen', true);
      }
    }
  }
});
